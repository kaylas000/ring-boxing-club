# 🔄 Руководство по миграции на Production-Ready версию

## 📋 Краткое описание

Это руководство поможет вам обновить существующие HTML-страницы для использования новой модульной архитектуры.

---

## ⚡ Быстрая миграция (5 минут)

### Шаг 1: Обновить подключение CSS

**Было:**
```html
<style>
  /* 800+ строк встроенного CSS */
</style>
```

**Стало:**
```html
<link rel="stylesheet" href="css/main.css">
```

### Шаг 2: Обновить JavaScript

**Было:**
```html
<script>
  class ShoppingCart {
    // встроенный код
  }
  const cart = new ShoppingCart();
</script>
```

**Стало:**
```html
<script type="module">
  import CartManager from './js/cart/CartManager.js';
  const cart = new CartManager();
  cart.init();
</script>
```

---

## 📝 Пошаговая миграция

### 1. index.html

#### Удалить встроенные стили
Удалите весь блок `<style>` (около 800 строк) из `<head>`.

#### Добавить ссылку на CSS
```html
<head>
  <!-- Другие meta-теги -->
  <link rel="stylesheet" href="css/main.css">
</head>
```

#### Обновить JavaScript
Замените встроенный JavaScript в конце `<body>`:

```html
<!-- Старый код -->
<script>
  class ShoppingCart {
    // ...
  }
  const cart = new ShoppingCart();
  // навигационное меню
  document.addEventListener('DOMContentLoaded', function() {
    // ...
  });
</script>

<!-- Новый код -->
<script type="module">
  import CartManager from './js/cart/CartManager.js';
  import Helpers from './js/utils/helpers.js';
  
  // Инициализация корзины
  const cart = new CartManager();
  cart.init();
  window.cart = cart; // для использования в onclick
  
  // Мобильное меню
  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
      hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', menu.classList.contains('active'));
      });
    }
    
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menu) menu.classList.remove('active');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
</script>
```

### 2. shop.html

Повторите те же шаги, что и для index.html.

### 3. cart.html

Дополнительно обновите функцию перехода к оформлению:

```html
<script type="module">
  import CartManager from './js/cart/CartManager.js';
  import Storage from './js/utils/storage.js';
  import Helpers from './js/utils/helpers.js';
  
  // Инициализация
  const cart = new CartManager();
  cart.init();
  window.cart = cart;
  
  // Рендер корзины (ваша логика)
  cart.renderCartItems();
  cart.updateOrderSummary();
  
  // Функция оформления
  window.goToCheckout = function() {
    if (cart.items.length === 0) {
      Helpers.toast('Корзина пуста!', 'error');
      return;
    }
    
    const checkoutData = {
      items: cart.items,
      totals: {
        subtotal: cart.calculateSubtotal(),
        discount: cart.calculateDiscount(cart.calculateSubtotal()),
        shipping: cart.calculateShipping(cart.calculateSubtotal()),
        total: cart.calculateSubtotal() - cart.calculateDiscount(cart.calculateSubtotal()) + cart.calculateShipping(cart.calculateSubtotal()),
        promoCode: cart.promoCode
      }
    };
    
    Storage.set('checkoutData', checkoutData);
    window.location.href = 'checkout.html';
  };
</script>
```

---

## 🎯 Примеры использования новых возможностей

### Toast-уведомления

```javascript
import Helpers from './js/utils/helpers.js';

// Успех
Helpers.toast('Товар добавлен в корзину!', 'success');

// Ошибка
Helpers.toast('Произошла ошибка', 'error');

// Информация
Helpers.toast('Обновите страницу', 'info');
```

### Валидация форм

```javascript
import Validation from './js/utils/validation.js';

const email = document.getElementById('email').value;
if (!Validation.isValidEmail(email)) {
  Helpers.toast('Некорректный email', 'error');
  return;
}

const phone = document.getElementById('phone').value;
if (!Validation.isValidPhone(phone)) {
  Helpers.toast('Некорректный телефон', 'error');
  return;
}
```

### Работа с localStorage

```javascript
import Storage from './js/utils/storage.js';

// Сохранить
Storage.set('userSettings', { theme: 'dark', notifications: true });

// Получить
const settings = Storage.get('userSettings', { theme: 'light' });

// Удалить
Storage.remove('userSettings');

// Проверить доступность
if (!Storage.isAvailable()) {
  console.warn('localStorage недоступен');
}
```

### Форматирование цены

```javascript
import Helpers from './js/utils/helpers.js';

const price = 8500;
const formatted = Helpers.formatPrice(price); // "8 500 ₽"
```

### Debounce для поиска

```javascript
import Helpers from './js/utils/helpers.js';

const searchInput = document.getElementById('search');
const debouncedSearch = Helpers.debounce((value) => {
  console.log('Поиск:', value);
  // выполнить поиск
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

## 🔧 Настройка под свои нужды

### Изменить цветовую схему

Откройте `css/variables.css` и измените переменные:

```css
:root {
  --gold-metal: #YOUR_COLOR; /* Золотой цвет */
  --silver-metal: #YOUR_COLOR; /* Серебряный цвет */
  --black: #YOUR_COLOR; /* Основной фон */
}
```

### Изменить отступы

```css
:root {
  --spacing-sm: 10px;  /* Маленький */
  --spacing-md: 15px;  /* Средний */
  --spacing-lg: 20px;  /* Большой */
  --spacing-xl: 30px;  /* Очень большой */
}
```

### Изменить параметры корзины

Откройте `js/cart/CartManager.js`:

```javascript
constructor() {
  // ...
  this.shippingCost = 300;             // Стоимость доставки
  this.freeShippingThreshold = 5000;   // Порог бесплатной доставки
}
```

### Добавить новый промокод

В методе `calculateDiscount()` класса `CartManager`:

```javascript
const promos = {
  'WELCOME10': 0.1,       // 10%
  'BOXING25': 0.25,       // 25%
  'FIGHT100': 100,        // 100₽
  'CHAMPION': 0.15,       // 15%
  'MYNEWCODE': 0.2        // Ваш новый промокод 20%
};
```

---

## ✅ Чек-лист после миграции

- [ ] Все страницы открываются без ошибок
- [ ] CSS загружается (проверить в DevTools → Network)
- [ ] JavaScript модули работают (проверить консоль)
- [ ] Корзина функционирует
- [ ] Мобильное меню работает
- [ ] Toast-уведомления появляются
- [ ] Внешний вид идентичен оригиналу
- [ ] Нет ошибок в консоли браузера
- [ ] LocalStorage работает
- [ ] Все кнопки кликабельны
- [ ] Формы валидируются

---

## 🐛 Решение проблем

### CSS не загружается

**Проблема:** Стили не применяются.

**Решение:**
- Проверьте путь к `css/main.css`
- Убедитесь, что файл существует
- Проверьте в DevTools → Network статус загрузки

### JavaScript модули не работают

**Проблема:** Ошибка "Unexpected token 'import'"

**Решение:**
- Добавьте `type="module"` в тег `<script>`
```html
<script type="module">
  import CartManager from './js/cart/CartManager.js';
</script>
```

### Корзина не обновляется

**Проблема:** Счетчик корзины не меняется.

**Решение:**
- Убедитесь, что `cart.init()` вызывается
- Проверьте наличие элемента `.cart-count` в HTML
- Проверьте консоль на ошибки

### localStorage не работает

**Проблема:** Данные не сохраняются.

**Решение:**
```javascript
import Storage from './js/utils/storage.js';

if (!Storage.isAvailable()) {
  console.error('localStorage недоступен');
  // использовать альтернативное хранилище
}
```

### Toast не появляется

**Проблема:** Уведомления не показываются.

**Решение:**
- Проверьте импорт Helpers
- Убедитесь, что CSS для toast загружен (автоматически)
- Проверьте z-index других элементов

---

## 📚 Дополнительные ресурсы

- [README.md](README.md) - Полная документация
- [css/variables.css](css/variables.css) - CSS переменные
- [js/cart/CartManager.js](js/cart/CartManager.js) - Логика корзины
- [js/utils/](js/utils/) - Утилиты

---

## 💬 Поддержка

Если возникли вопросы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все файлы на месте
3. Сравните с примерами выше
4. Создайте issue в репозитории

---

**Готово!** 🎉 Ваш сайт теперь использует production-ready архитектуру.
