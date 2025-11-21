// Shop.js - catalog functionality
const shop = {
  init() {
    this.renderProducts();
    this.setupFilters();
  },
  
  renderProducts() {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    const html = PRODUCTS.map(product => `
      <div class="product-card">
        <div class="product-image">Относительно картинка</div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price} руб.</div>
          <button onclick="addToCart(${product.id})" class="btn">V корзину</button>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = html;
  },
  
  setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search');
    
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => this.renderProducts());
    }
    
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderProducts());
    }
  }
};

document.addEventListener('DOMContentLoaded', () => shop.init());
