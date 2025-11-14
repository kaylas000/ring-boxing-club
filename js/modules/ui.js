// UI-модали, уведомления, бургер-меню
export function showModal(msg) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `<div class='modal-content'>${msg}<button onclick='this.parentNode.parentNode.remove()'>Закрыть</button></div>`;
  document.body.appendChild(modal);
}
export function showNotification(msg) {
  const n = document.createElement('div'); n.className = 'notification'; n.textContent = msg; document.body.appendChild(n);
  setTimeout(()=>n.remove(),2500);
}
