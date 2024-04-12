// build a web component for menu page

// MenuPage is a new kind of html element
// with the props and methods of a standard html element
export class MenuPage extends HTMLElement {
  constructor() {
    // must call the super constructor of parent class HTMLElement
    super();
    // create a shadow DOM root for the element
    this.root = this.attachShadow({ mode: "open" });

    // load the css for the component
    // first
    const styles = document.createElement("style");
    // attach the styles to the shadow root
    this.root.appendChild(styles);
    // then load the css file
    // with an async function
    async function loadCss() {
      const req = await fetch("/components/MenuPage.css");
      const css = await req.text();
      styles.textContent = css;
    }
    loadCss();
  }

  // when the component is added to the DOM
  // this lifecycle mthod from CusomtElements API is called
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // listen for the appMenuUpdated event
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    // render the component
    this.render();
  }
  // data changed so re-render the component/ui
  render() {
    if (app.store.menu) {
      // clean up the contents
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        // dynmanic html creation with template literals
        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class="category">
        </ul>
        `;
        this.root.querySelector("#menu").appendChild(liCategory);

        // // new component creation for each product in the category array
        category.products.map((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading... ";
    }
  }
}

// communicate with the custom elements api
// to def a new html element
customElements.define("menu-page", MenuPage);
