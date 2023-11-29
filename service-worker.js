// Service Worker 등록
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
          console.log('Service Worker 등록 성공:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service Worker 등록 실패:', error);
        });
    });
  }

  // 필요한 파일 캐싱
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        'script.js',
        'index.html',
        '/',
      ]);
    })
  );
});

// 오프라인 요청 대응
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('index.html');
    })
  );
});