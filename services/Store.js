// the store service for app wide state management
import API from "./API.js";

// private store object
const Store = {
  menu: null,
  cart: [],
};

// create a new proxy object
const proxiedStore = new Proxy(Store, {
  // when a property is set proxy trap
  set: (target, property, value) => {
    // set the property on the target object
    target[property] = value;
    // if the property is "menu"
    if (property === "menu") {
      // dispatch an event to all listeners that menu changed
      window.dispatchEvent(new Event("appmenuchange"));
    }
    // if the property is "cart"
    if (property === "cart") {
      // dispatch an event to all listeners
      window.dispatchEvent(new Event("appcartchange"));
    }
    // return true to indicate success
    return true;
  },
});

export default proxiedStore;
