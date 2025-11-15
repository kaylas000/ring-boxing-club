// ===== SHOPPING CART =====
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        this.items.push(product);
        this.saveToStorage();
        this.updateCartCount();
        this.showNotification('Товар добавлен в корзину!');
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveToStorage();
        this.updateCartCount();
    }

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartButtons = document.querySelectorAll('.cart-button, [data-cart-count]');
        cartButtons.forEach(btn => {
            btn.textContent = `🛒 ${this.items.length}`;
            btn.setAttribute('data-cart-count', this.items.length);
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00d4ff;
            color: #000;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    getCartItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
    }
}

// ===== INITIALIZATION =====
let cart = null;

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    cart = new ShoppingCart();

    // Обработчики для кнопок добавления товара
    const addToCartButtons = document.querySelectorAll('[data-add-to-cart], .add-to-cart, button:contains("Добавить")');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('[data-product], .product-card, .product-item');
            if (productCard) {
                const product = {
                    id: productCard.dataset.productId || index,
                    name: productCard.querySelector('h3, .product-name, [data-product-name]')?.textContent || 'Товар',
                    price: productCard.querySelector('[data-price], .product-price, .price')?.textContent || '0₽',
                    image: productCard.querySelector('img')?.src || ''
                };
                cart.addItem(product);
            }
        });
    });

    // Обработчик для кнопки корзины (навигация)
    const cartButtons = document.querySelectorAll('.cart-button, [data-cart-link]');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = './cart.html';
        });
    });

    // Загрузка и отображение товаров в корзине
    if (document.querySelector('[data-cart-items]')) {
        loadCartItems();
    }

    // Обработчик для кнопки оформления заказа
    const checkoutButton = document.querySelector('[data-checkout-btn], .checkout-button, button:contains("Оформить")');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.items.length > 0) {
                window.location.href = './checkout.html';
            } else {
                alert('Корзина пуста! Добавьте товары.');
            }
        });
    }

    // CSS Анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .cart-button, [data-cart-link] {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .cart-button:hover, [data-cart-link]:hover {
            transform: scale(1.1);
        }
        
        .add-to-cart, [data-add-to-cart] {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .add-to-cart:active, [data-add-to-cart]:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
});

// ===== CART PAGE FUNCTIONS =====
function loadCartItems() {
    const cartContainer = document.querySelector('[data-cart-items]');
    if (!cartContainer || !cart) return;

    const items = cart.getCartItems();
    
    if (items.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Корзина пуста</p>';
        return;
    }

    let total = 0;
    let html = '';

    items.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/[^\d]/g, '')) || 0;
        total += price;
        
        html += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #1a1a1a; margin-bottom: 10px; border-radius: 5px;">
                <div style="flex: 1;">
                    <h4 style="color: #00d4ff; margin: 0 0 5px 0;">${item.name}</h4>
                    <p style="color: #999; margin: 0;">${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #ff4444; color: #fff; border: none; padding: 8px 15px; border-radius: 3px; cursor: pointer;">Удалить</button>
            </div>
        `;
    });

    cartContainer.innerHTML = html;

    // Обновляем итоговую сумму
    const totalElement = document.querySelector('[data-cart-total], .cart-total, .order-summary');
    if (totalElement) {
        totalElement.innerHTML = `
            <div style="background: #1a1a1a; padding: 20px; border-radius: 5px; margin-top: 20px;">
                <p style="color: #999;">Всего товаров: <span style="color: #00d4ff; font-weight: bold;">${items.length}</span></p>
                <h3 style="color: #00d4ff; margin: 10px 0;">Итого: <span style="color: #fff;">${total}₽</span></h3>
                <button onclick="window.location.href='./checkout.html'" style="width: 100%; background: #00d4ff; color: #000; border: none; padding: 12px; border-radius: 3px; cursor: pointer; font-weight: bold; margin-top: 15px;">Оформить заказ</button>
            </div>
        `;
    }
}

function removeFromCart(index) {
    if (cart) {
        cart.removeItem(index);
        loadCartItems();
        cart.showNotification('Товар удален из корзины');
    }
}

// ===== ADDITIONAL FEATURES =====

// Поиск
function setupSearch() {
    const searchInputs = document.querySelectorAll('[data-search], .search-input, input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const products = document.querySelectorAll('[data-product], .product-card');
            products.forEach(product => {
                const name = product.textContent.toLowerCase();
                product.style.display = name.includes(query) ? '' : 'none';
            });
        });
    });
}

// Фильтрация по цене
function setupPriceFilter() {
    const priceFilter = document.querySelector('[data-price-filter]');
    if (priceFilter) {
        priceFilter.addEventListener('input', function() {
            const maxPrice = parseFloat(this.value);
            const products = document.querySelectorAll('[data-product], .product-card');
            products.forEach(product => {
                const price = parseFloat(product.dataset.price || product.querySelector('[data-price]')?.textContent.replace(/[^\d]/g, '')) || 0;
                product.style.display = price <= maxPrice ? '' : 'none';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
    setupPriceFilter();
});
