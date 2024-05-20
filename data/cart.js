export const cart = [];

export function addToCart(productId) {
  let matchingItem;//if we find a matching item we're going to save it here
  cart.forEach((cartItem) => { //item (parameter) will contain product name and quantity
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) { // if we find any matching item it will be an object | it's a truthy value
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId : productId,
      quantity : 1
    });
  }
}