const Router = {
  // control the default behavior of the browser/navlink
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Link clicked");
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    //listen for URL changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // check initital url
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    // remove the current element
    document.querySelector("main").children[0]?.remove();

    // console.log(`Route to  ${route}`);

    if (addToHistory) {
      history.pushState({ route }, null, route);
    }
    let pageElement = null;

    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          // obtain the param id
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
        break;
    }
    // check if the page exhists
    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      // clear page position
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      // 404
      console.log("Page not found");
      document.querySelector("main").innerHTML = "<h1>404 Page not found</h1>";
    }
  },
};

export default Router;
