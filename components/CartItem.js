// cart item component for rendering the cart item in the cart view

import { removeItemFromCart } from "../services/Order.js";

// create the class
export default class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  // lifecycle method fires when the component is added to the DOM
  // part of the Custom Elements API
  connectedCallback() {
    // assign item to the parsed JSON object data
    const item = JSON.parse(this.dataset.item);
    // clear the element before new content is added
    this.innerHTML = "";

    // assign the template to the document instance via the getElementById method
    // to the html element with the id of cart-item-template
    const template = document.getElementById("cart-item-template");
    // assign content to the deep copy of the template
    const content = template.content.cloneNode(true);

    // cloned content appended to the element
    this.appendChild(content);

    this.querySelector(".qty").textContent = `${item.quantity}x`;
    this.querySelector(".name").textContent = item.product.name;
    this.querySelector(".price").textContent = `$${item.product.price.toFixed(
      2
    )}`;
    this.querySelector("a.delete-button").addEventListener("click", (event) => {
      removeItemFromCart(item.product.id);
    });
  }
}

customElements.define("cart-item", CartItem);
