// Category.js
const category = {
  init() {
    this.renderProducts();
  },
  renderProducts() {
    const container = document.querySelector('.products-grid');
    if (!container) return;
    
    const categoryType = window.location.pathname.includes('equipment') ? 'equipment' : 
                        window.location.pathname.includes('cosmetic') ? 'cosmetic' : 'pharma';
    
    const products = PRODUCTS.filter(p => p.category === categoryType);
    
    const html = products.map(product => `
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
  }
};

document.addEventListener('DOMContentLoaded', () => category.init());
