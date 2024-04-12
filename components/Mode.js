// build a web component to switch between light and dark mode
// example custom element
export class ModeToggle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const doc = document.documentElement;

    const toggleMode = (e) => {
      const currentTheme = doc.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      doc.setAttribute("data-theme", newTheme);
    };
    this.addEventListener("change", toggleMode);
  }
}
customElements.define("mode-toggle", ModeToggle);

// use of the custom element in the html
// custom element with customized builtins example in html
// saying to the browser, in this div use this class
// <div is="mode-toggle"></div>
