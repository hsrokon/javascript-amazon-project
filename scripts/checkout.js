import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
//import "../data/backend-practice.js";

loadProducts( () => {//anonymous function
  renderOrderSummary();//after loading the products we run these function
  renderPaymentSummary();
});