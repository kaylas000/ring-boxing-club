// Cart data
const STORAGE_KEY = 'ring-boxing-cart';
const PRODUCTS = [
  { id: 1, name: 'Боксэрские принадлежности', category: 'equipment', price: 2500 },
  { id: 2, name: 'Груша для тренировки', category: 'equipment', price: 5000 },
  { id: 3, name: 'Шампунь для спортсменов', category: 'cosmetic', price: 500 },
  { id: 4, name: 'Протеин втратов', category: 'pharma', price: 3000 },
];

// Initialize cart
function initCart() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Add to cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const existing = cart.find(item => item.id === productId);
  
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  initCart();
  alert('Товар добавлен в корзину');
}

// Get cart
function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

// Clear cart
function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
  initCart();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCart);
