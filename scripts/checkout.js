import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import "../data/backend-practice.js";


//Async Await even better way to handle code | Promise creates a lot of extra codes | async makes a function return a promise | async lets us use await which lets us wait for promise to finish before going to next line | only works with promises| functions needs to be async, donot work with normal functon
async function loadPage() {
  try {//if code inside try gets error it'll run catch below which takes one param 'error' | try catch can also be used with normal code other than async await
    //throw 'error1'//creates an error | which skips codes till catch
    await loadProductsFetch();

    const value = await new Promise ( (resolve, reject) => {
      //throw 'error2'
      loadCart( () => {
        //reject('error3');//reject is function which lets us create an error in futre
        resolve('value33'); //we can save whatever in resolve inside a variable instead .then | 'const value = '
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([//let's us run multiple Promises at the same time and wait for all of them to finish | Array of promises
  loadProductsFetch(),//this will return a promise when we use it with Promise.all
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
*/

/*just kept it
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
}); */


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