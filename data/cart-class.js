class Cart {//names that generates objects uses PascalCase
  cartItems;//cartItems = undefined;
  #localStorageKey;//#localStorageKey makes it private | this is a private property and can only be used inside of this class

  constructor (localStorageKey) {//everytime we generate an obj it'll run the code inside here
    this.#localStorageKey= localStorageKey;//setup codes
    this.#loadFromStorage();//setup codes
  }

  #loadFromStorage () {
    this.cartItems =JSON.parse( localStorage.getItem(this.#localStorageKey));
    

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
  }

  saveToStorage () {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

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
  }

  removeFromCart (productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
    this.saveToStorage();
  }

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
} 


const cart = new Cart('cart-oop');//this generates a new object using our class
const businessCart = new Cart('cart-business');//each object that we generate from a class is called an Instance of a class


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);//this will check if this object is generated from this class

/* 
Features of classes
-Constructor = lets us run setup code after creating an object
it lets us put this setup codes inside the class */