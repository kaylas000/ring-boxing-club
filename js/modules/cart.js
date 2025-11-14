// Корзина товаров (ES6+)
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  add(product) {
    const i = this.items.findIndex(p => p.id === product.id);
    if (i > -1) this.items[i].qty += 1;
    else this.items.push({...product, qty: 1});
    this._save();
  }
  remove(productId) {
    this.items = this.items.filter(p => p.id !== productId);
    this._save();
  }
  qty(productId, qty) {
    const p = this.items.find(i => i.id === productId);
    if (p) { p.qty = qty; this._save(); }
  }
  clear() {
    this.items = []; this._save();
  }
  total() {
    return this.items.reduce((a,p)=>a+p.price*p.qty,0);
  }
  _save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    document.querySelector('.cart-btn')?.textContent = `Корзина (${this.items.length})`;
  }
}
window.cart = new Cart();
