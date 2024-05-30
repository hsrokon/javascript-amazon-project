import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import "../data/backend-practice.js";


Promise.all([//let's us run multiple Promises at the same time and wait for all of them to finish | Array of promises
  new Promise( (resolve) => {
    loadProducts( () => {
      resolve('value1');
    })
  }),
  new Promise ( (resolve) => {
    loadCart( () => {
      resolve();
    });
  })
]).then( (values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});


/*
new Promise( (resolve) => {//Promise is a built in class | allows JS to do multiple things at the same time
  //when we creae a promise it's going to run this function immedietly
  loadProducts( () => {
    resolve('value1');//resolve() function works similarly like Jasmine's done(); | it let's us control when to go to the next step | we waited for the product to finished loading then we called resolve() to go to the next step | whatever we give to resolve it's gonna be saved in parameter('value1' will be saved in value param)
  })
}).then( (value) => {//.then is next step | first we run previous asynchronous code -> wait for it to finish -> then we run resolve -> then go to next step
  return new Promise ( (resolve) => {
    loadCart( () => {
      resolve();
    });
  })
}).then( () => {
  renderOrderSummary();
    renderPaymentSummary();
});
//first step -> wait for it to finish -> call resolve -> then goes to the second step | goes on as long as we want | promises helps to keep our code flat avoids nesting | promises recommended than callbacks below
*/

/*
loadProducts( () => {//anonymous function
  loadCart(() => {
    renderOrderSummary();//after loading the products we run these function
    renderPaymentSummary();
  })
});
*/