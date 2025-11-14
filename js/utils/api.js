// Пример скрипта для работы с API из фронтенда
async function login(email, pass) {
  const r = await fetch('/api/auth/login', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password: pass})
  });
  if (!r.ok) throw new Error('Ошибка входа');
  return await r.json();
}

async function fetchProducts() {
  const r = await fetch('/api/products');
  return await r.json();
}

async function createOrder(order) {
  const r = await fetch('/api/orders', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(order)
  });
  return await r.json();
}

window.api = {login, fetchProducts, createOrder};
