export let cart =JSON.parse( localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId : '1'
  },{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionId : '2'
  }];
}

function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));//first string is a name | second string is the data
}

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
      quantity : 1,
      deliveryOptionId : '1'
    });
  }
  saveToStorage();
}

export function removeFromCart (productId) {
  const newCart = [];

  //it's gonna contain all the cart items that don't match this productID | that's same as removing it from the cart | by looping through the cart in new array we're going to add each product except for this productId
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {//this productID is from the checkout.js where we called removeFromCart(productId)
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}


export function updateDliveryOption (productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => { 
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}