// build a web component for menu page

export class OrderPage extends HTMLElement {
  // data binding step one
  // build a private object data model to store the user data
  #user = {
    name: "",
    email: "",
    phone: "",
  };

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    const section = document.createElement("section");
    this.root.appendChild(section);

    async function loadCSS() {
      const request = await fetch("/components/OrderPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    let section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      let total = 0;
      for (let prodInCart of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        this.root.querySelector("ul").appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;
    }
    this.setFormBindings(this.root.querySelector("form"));
  }

  // data binding step two
  // bind object with form via method
  // gets the form data and updates the object
  setFormBindings(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(`Hi ${this.#user.name}, your oder has been submitted!`);
      // clear the form
      this.#user.name = "";
      this.#user.email = "";
      this.#user.phone = "";

      // send the data to the server
      window.dispatchEvent(new CustomEvent("appcartchange"));
    });

    // set dbl data binding
    this.#user = new Proxy(this.#user, {
      // one way data binding
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });
    // the two way data binding by talking to the form elements
    Array.from(form.elements).forEach((element) => {
      element.addEventListener("change", (event) => {
        this.#user[element.name] = element.value;
      });
    });
  }
}
// communicate with the custom elements api
// to def a new html element
customElements.define("order-page", OrderPage);
