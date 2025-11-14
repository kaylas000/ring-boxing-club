const { expect } = require('chai');
describe('Корзина', function() {
  it('добавляет товар и считает сумму', function() {
    const Cart = require('../js/modules/cart');
    const cart = new Cart();
    cart.add({id:'gloves1',name:'Everlast',price:4500});
    expect(cart.total()).to.equal(4500);
  });
});
