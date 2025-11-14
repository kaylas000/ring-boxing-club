// Ленивая загрузка изображений и видео
if ('IntersectionObserver' in window) {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-src]').forEach(img => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(ent=>{
          if (ent.isIntersecting) {
            img.src = img.dataset.src;
            obs.unobserve(img);
          }
        });
      });
      obs.observe(img);
    });
  });
}