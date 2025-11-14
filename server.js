const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

const users = [{id: 1, email: 'user@example.com', password: 'pass', name: 'Иван'}];
const products = [{id: 'gloves1', name: 'Everlast Pro', price: 4500, category: 'gloves'}];
const orders = [];
const bookings = [];

// User Auth
app.post('/api/auth/login', (req, res) => {
  const {email, password} = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({msg: 'Неверный email или пароль'});
  const token = jwt.sign({id: user.id, email: user.email}, SECRET, {expiresIn: '2h'});
  res.json({token, name: user.name});
});

// Products
app.get('/api/products', (req, res) => res.json(products));

// Orders
app.post('/api/orders', (req, res) => {
  const order = {...req.body, id: orders.length + 1, date: new Date()};
  orders.push(order);
  res.status(201).json(order);
});

// Bookings
app.post('/api/bookings', (req, res) => {
  const booking = {...req.body, id: bookings.length + 1, date: new Date()};
  bookings.push(booking);
  res.status(201).json(booking);
});

// Example schedule API
app.get('/api/schedule', (req,res) => {
  res.json([
    {day: 'Понедельник', time: '09:00-10:30', group: 'Для начинающих', coach: 'Иван Иванов'},
    {day: 'Понедельник', time: '18:00-19:30', group: 'Продвинутые', coach: 'Пётр Сергеевич'}
  ]);
});

app.listen(PORT, () => console.log('Ring Boxing Club API на http://localhost:' + PORT));
