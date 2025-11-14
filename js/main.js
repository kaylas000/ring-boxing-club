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
        this.showNotification('Товар добавлен в корзину');
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
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.length;
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px 20px; border-radius: 5px; z-index: 9999;';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// ===== PRODUCTS =====
const products = [
    {
        id: 1,
        name: 'Боксерские перчатки 10oz',
        price: 4500,
        description: 'Профессиональные перчатки для тренировок',
        image: '🥊'
    },
    {
        id: 2,
        name: 'Мешок боксерский 70кг',
        price: 8500,
        description: 'Тяжелый мешок для тренировки ударов',
        image: '🥋'
    },
    {
        id: 3,
        name: 'Шнур для прыжков',
        price: 1200,
        description: 'Качественный спортивный шнур',
        image: '🎯'
    },
    {
        id: 4,
        name: 'Бандажи для рук - Комплект 5м',
        price: 800,
        description: 'Дыхательные бандажи для поддержки рук',
        image: '🏋️'
    }
];

// ===== INITIALIZATION =====
let cart = null;

document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    initializeCartButton();
    initializeProfileButton();
    initializeSmoothedScroll();
    initializeFormValidation();
    loadProductsIfAvailable();
});

// ===== CART BUTTON =====
function initializeCartButton() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
}

// ===== PROFILE BUTTON =====
function initializeProfileButton() {
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            const userLoggedIn = localStorage.getItem('user');
            if (userLoggedIn) {
                window.location.href = 'profile.html';
            } else {
                alert('Пожалуйста, войдите в систему');
                window.location.href = 'contacts.html';
            }
        });
    }
}

// ===== SMOOTH SCROLL FOR LINKS =====
function initializeSmoothedScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '';
                }
            });
            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все поля');
            }
        });
    });
}

// ===== LOAD PRODUCTS =====
function loadProductsIfAvailable() {
    const shopSection = document.querySelector('.shop-products');
    if (shopSection) {
        displayProducts(products);
    }
}

function displayProducts(productList) {
    const shopSection = document.querySelector('.shop-products');
    if (!shopSection) return;

    shopSection.innerHTML = '';
    productList.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `<div class="product-image">${product.image}</div><div class="product-info"><h3 class="product-name">${product.name}</h3><p class="product-price">${product.price} руб.</p><p>${product.description}</p><button class="btn btn-primary" onclick="addToCart(${index})">Добавить в корзину</button></div>`;
        shopSection.appendChild(productCard);
    });
}

function addToCart(index) {
    if (cart && products[index]) {
        cart.addItem(products[index]);
    }
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.';
}

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

// ===== PAGE-SPECIFIC FUNCTIONS =====
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="name"]')?.value;
            const email = this.querySelector('input[name="email"]')?.value;
            const message = this.querySelector('textarea[name="message"]')?.value;
            
            if (name && email && message) {
                if (cart) cart.showNotification('Спасибо! Мы скоро вам ответим');
                this.reset();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeContactForm);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShoppingCart, products, addToCart, displayProducts };
}
