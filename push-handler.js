// Push-уведомления и фоновые действия для PWA
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.text() : 'Новое уведомление!';
  event.waitUntil(self.registration.showNotification('RING BOXING CLUB', {
    body: data,
    icon: '/assets/icons/icon-192.png'
  }));
});
self.addEventListener('notificationclick', function(evt) {
  evt.notification.close();
  evt.waitUntil(clients.openWindow('/'));
});
