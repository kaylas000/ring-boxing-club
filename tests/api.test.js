const { expect } = require('chai');
describe('API', function() {
  it('создаёт заказ через /api/orders', async function() {
    const res = await fetch('/api/orders', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({product:'gloves1',qty:1})});
    expect(res.status).to.equal(201);
    const order = await res.json();
    expect(order.product).to.equal('gloves1');
  });
});
