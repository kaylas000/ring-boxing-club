// Плавная прокрутка якорей
export function smoothScroll(selector) {
  document.querySelectorAll(selector).forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if (t) {e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});} });
  });
}