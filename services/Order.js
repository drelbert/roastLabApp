// build a function to add item to cart by receiving an id
import { getProductById } from "./Menu.js";

export async function addItemToCart(id) {
  const product = await getProductById(id);
  // update cart as needed, find the product in the cart
  const results = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id === id
  );
  // check if prod id is === current id
  if (results.length == 1) {
    // if the item is already in the cart, increment the quantity
    // update current item
    app.store.cart = app.store.cart.map((p) =>
      p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p
    );
  } else {
    // if not, then a new item is added to the cart
    // by creating a new array that spreads the current cart and adds the new item
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeItemFromCart(id) {
  // remove item from cart
  // create a new array that filters the cart and removes the item with the matching id
  app.store.cart = app.store.cart.filter((p) => p.product.id !== id);
}
