export const cart = [{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity : 2,
},{
  productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity : 1,
}];

export function addToCart(productId) {
  let matchingItem;//if we find a matching item we're going to save it here
  cart.forEach((cartItem) => { //by forEach we enter into cart and save data into cartItem (parameter)
    if (productId === cartItem.productId) {//here we access productId from the parameter
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