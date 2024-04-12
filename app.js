import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Store from "./services/Store.js";
import Router from "./services/Router.js";

// link/import web components for ecxecution in the browser
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

// the globals
window.app = {};
app.store = Store;
app.router = Router;

// wait for event to fire before running the function
window.addEventListener("DOMContentLoaded", function () {
  loadData();
  app.router.init();
});

// SPA with section based routing and use the history API to push and pop new entries
// use of DOM APIs and web components

// app level state change
// event listener to update the badge count for the cart
window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
