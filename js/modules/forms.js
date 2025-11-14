// Утилиты для форм: простая валидация email и номера телефона
export function isValidEmail(email) { return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email); }
export function isValidPhone(phone) { return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phone); }