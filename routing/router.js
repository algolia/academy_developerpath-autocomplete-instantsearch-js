import { initSearchPage } from "../src/searchpage";

const noop = () => {};
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  404: { page: "/pages/404.html", init: noop },
  "/": { page: "/pages/index.html", init: noop },
  "/search": { page: "/pages/searchpage.html", init: initSearchPage },
  "/search/Mens/Clothing": { page: "/pages/searchpage.html", init: initSearchPage },
  "/search/Womens/Clothing": { page: "/pages/searchpage.html", init: initSearchPage },
};

let lastRoute = '';
const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];

  if (lastRoute === route.page) {
    return;
  }

  lastRoute = route.page;

  const html = await fetch(route.page).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
  if (route.init) {
    route.init();
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
