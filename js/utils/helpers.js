// Вспомогательные функции для DOM, строк, чисел
export function dom(selector) { return document.querySelector(selector); }
export function money(num) { return num.toLocaleString('ru-RU') + ' ₽'; }
// Прочие вспомогательные методы по мере необходимости.