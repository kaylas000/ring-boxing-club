// Роутер SPA (простая реализация)
export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('popstate', () => this.navigate(location.pathname));
  }
  navigate(path) {
    if (this.routes[path]) {
      document.querySelector('main').innerHTML = '';
      fetch(this.routes[path]).then(r=>r.text()).then(html=>{
        document.querySelector('main').innerHTML = html;
      });
      history.pushState({}, '', path);
    }
  }
}
window.Router = Router;
