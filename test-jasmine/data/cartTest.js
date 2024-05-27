import { addToCart, cart,loadFromStorage } from "../../data/cart.js";

describe('test suite : addToCart', () => {
  it('adds an existing product to the cart', () => {
    //a mock only lasts fro one test | once test is finished method is no longer mocked 
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1,
        deliveryOptionId : '1'
      }]);
    });
    
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//since addToCart takes productId parameter
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    //we don't want to effect our original code by mocking | the order of the code matters | so we want to mock localStorage.setItem first when we call addToCart(below) so now setItem will be replaced with a fake version and this will no longer saved to localStorage
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);//sice localStorage only takes string
    });
    //localStorage is an object |'getItem' string is the mothod that we want to mock | this will replace localStorage.getItem with a fake version anything we want | spyOn gives a property called .and | and this result is also and object which has a method called .callFake

    loadFromStorage();//we reload cart with an empty array we created above

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);//this method checks how many times localStorage.setItem was called
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//cart[0] is first product
    expect(cart[0].quantity).toEqual(1);
  });


  //FlakyTest = test sometimes passes and sometimes fails | even we don't change the code
  //Mocks = creates a fake version of something | spyOn is a mock here
});