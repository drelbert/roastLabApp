import { addItemToCart } from "../services/Order.js";

export default class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  // no shadow DOM for this component

  // lifecycle method fires when the component is added to the DOM
  // part of the Custom Elements API
  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("p.price").textContent = `$${product.price.toFixed(2)}`;
    this.querySelector("img").src = `data/images/${product.image}`;

    this.querySelector("a").addEventListener("click", (event) => {
      console.log(event.target.tagName);
      // if tagname is button,
      if (event.target.tagName.toLowerCase() == "button") {
        addItemToCart(product.id);
      } else {
        app.router.go(`/product-${product.id}`);
      }
      event.preventDefault();
    });
  }
}

customElements.define("product-item", ProductItem);
