// Кэш-стратегии для различных ресурсов (демо-скрипт для PWA)
self.importScripts && self.importScripts('sw.js');
const API_CACHE = 'api-cache-v1';
self.addEventListener('fetch', event => {
  if(event.request.url.includes('/api/')){
    event.respondWith(
      caches.open(API_CACHE).then(cache =>
        fetch(event.request).then(res => {
          cache.put(event.request, res.clone());
          return res; })
        .catch(()=>caches.match(event.request))));
  }
});
