function Cart (localStorageKey) {//in oop use PascalCase for things that generate objects
  const cart = {
    cartItems : undefined,//cartItems = undefined

    loadFromStorage () {
      this.cartItems =JSON.parse( localStorage.getItem(localStorageKey));
      //this.cartItem will alaways work even if we change the var name

    if (!this.cartItems) {
      this.cartItems = [{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 2,
        deliveryOptionId : '1'
      },{
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        deliveryOptionId : '2'
      }];
    }
    },

    saveToStorage () {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => { 
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId : productId,
          quantity : 1,
          deliveryOptionId : '1'
        });
      }
      this.saveToStorage();
    },

    removeFromCart (productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateDliveryOption (productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => { 
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
};
return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();
//oop = organizing our codes into objects
//oop tries to represent real world
//oop makes it easy to create multiple objects



console.log(cart);
console.log(businessCart);