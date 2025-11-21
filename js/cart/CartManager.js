/**
 * CART MANAGER
 * Manages shopping cart operations
 */

import Storage from '../utils/storage.js';
import Helpers from '../utils/helpers.js';

class CartManager {
  constructor() {
    this.storageKeys = {
      equipment: 'ringBoxingCart',
      cosmetic: 'ringCosmeticCart',
      pharma: 'ringPharmaCart'
    };
    this.items = [];
    this.promoCode = null;
    this.shippingCost = 300;
    this.freeShippingThreshold = 5000;
  }

  /**
   * Initialize cart
   */
  init() {
    this.loadFromStorage();
    this.updateUI();
  }

  /**
   * Load cart items from storage
   */
  loadFromStorage() {
    const equipmentCart = Storage.get(this.storageKeys.equipment, []);
    const cosmeticCart = Storage.get(this.storageKeys.cosmetic, []);
    const pharmaCart = Storage.get(this.storageKeys.pharma, []);
    
    this.items = [...equipmentCart, ...cosmeticCart, ...pharmaCart];
  }

  /**
   * Save items to storage by category
   */
  saveToStorage() {
    const equipmentItems = this.items.filter(item => item.category === 'equipment');
    const cosmeticItems = this.items.filter(item => item.category === 'cosmetic');
    const pharmaItems = this.items.filter(item => item.category === 'pharma');

    Storage.set(this.storageKeys.equipment, equipmentItems);
    Storage.set(this.storageKeys.cosmetic, cosmeticItems);
    Storage.set(this.storageKeys.pharma, pharmaItems);
  }

  /**
   * Add item to cart
   * @param {Object} product - Product to add
   */
  addItem(product) {
    const existingIndex = this.items.findIndex(
      item => item.name === product.name && item.price === product.price
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        id: Helpers.generateId(),
        name: product.name,
        price: product.price,
        quantity: 1,
        category: product.category
      });
    }

    this.saveToStorage();
    this.updateUI();
    Helpers.toast('Товар добавлен в корзину!', 'success');
  }

  /**
   * Remove item from cart
   * @param {number} index - Item index
   */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.saveToStorage();
      this.updateUI();
      Helpers.toast('Товар удалён из корзины', 'info');
    }
  }

  /**
   * Update item quantity
   * @param {number} index - Item index
   * @param {number} quantity - New quantity
   */
  updateQuantity(index, quantity) {
    const qty = parseInt(quantity);
    if (qty >= 1 && qty <= 99 && index >= 0 && index < this.items.length) {
      this.items[index].quantity = qty;
      this.saveToStorage();
      this.updateUI();
    }
  }

  /**
   * Increase item quantity
   * @param {number} index - Item index
   */
  increaseQuantity(index) {
    if (index >= 0 && index < this.items.length && this.items[index].quantity < 99) {
      this.items[index].quantity++;
      this.saveToStorage();
      this.updateUI();
    }
  }

  /**
   * Decrease item quantity
   * @param {number} index - Item index
   */
  decreaseQuantity(index) {
    if (index >= 0 && index < this.items.length && this.items[index].quantity > 1) {
      this.items[index].quantity--;
      this.saveToStorage();
      this.updateUI();
    }
  }

  /**
   * Calculate subtotal
   * @returns {number}
   */
  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Calculate discount
   * @param {number} subtotal - Subtotal amount
   * @returns {number}
   */
  calculateDiscount(subtotal) {
    if (!this.promoCode) return 0;
    
    const promos = {
      'WELCOME10': 0.1,
      'BOXING25': 0.25,
      'FIGHT100': 100,
      'CHAMPION': 0.15
    };

    const discount = promos[this.promoCode];
    if (typeof discount === 'number') {
      return discount < 1 ? subtotal * discount : discount;
    }
    return 0;
  }

  /**
   * Calculate shipping cost
   * @param {number} subtotal - Subtotal amount
   * @returns {number}
   */
  calculateShipping(subtotal) {
    return subtotal >= this.freeShippingThreshold || subtotal === 0 
      ? 0 
      : this.shippingCost;
  }

  /**
   * Get total item count
   * @returns {number}
   */
  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Clear all items
   */
  clearCart() {
    this.items = [];
    this.promoCode = null;
    this.saveToStorage();
    this.updateUI();
  }

  /**
   * Update UI (header cart count)
   */
  updateUI() {
    const count = this.getTotalCount();
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
      if (count > 0) {
        cartCount.textContent = count;
        cartCount.style.display = 'flex';
      } else {
        cartCount.style.display = 'none';
      }
    }
  }
}

export default CartManager;
