import { cart, removeFromCart, updateDliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"; 
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //ESM Version library = EcmaScript(another name of JS) Module to import files exported from online files | dayjs here is default import that uses no {}
import { deliveryOptions } from "../data/deliveryOptions.js";

//just a trial
const today =dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));// according to the documentation format [https://day.js.org/docs/en/display/format] |Wednesday, May 29 |


function renderOrderSummary () {
//we'll update the data and regenerate the HTML


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (product.id===productId) {
      matchingProduct = product;//if product id matches than we transfer every product data to matchingProduct so we can use id, image name from it
    }
  });


  const  deliveryOptionId = cartItem.deliveryOptionId; //this cartItem is from cart.forEach((cartItem)

  let deliveryOption;

  deliveryOptions.forEach ((option) => {//from deliveryOptions.js
    if (option.id === deliveryOptionId) {// between deliveryOptions delivery id and cart's deliveryOptionId
      deliveryOption = option;//than we transfer every deliveryOptions data to deliveryOption
    }
  });

  //now we got everything from products into matchingProducts
  //everything from deliveryOptions into deliveryOption

  //this code is just for the dateString
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays, 'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  cartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `;
});

function deliveryOptionsHTML (matchingProduct, cartItem) {//dateString, PriceString and checking is under deliveryOptionsHTML
  let html = '';
  
  deliveryOptions.forEach((deliveryOption) => {//deliveryOptions is from deliveryOptions.js
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'//we're adding specific amount days with today from deliveryOptions.js by deliveryOption.deliveryDays
    );
    const dateString = deliveryDate.format(//now we're formatting the Delivery date from eliveryDate variable
      'dddd, MMMM D'
    );

    const priceString = deliveryOption.priceCents 
    === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
//if first part returns true the value is whatever after question mark
//if first part returns false the value is whatever after colon

  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;//this is for checking the options

    html+=`
    <div class="delivery-option js-delivery-option"
    data-product-id ="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}" >
    <input type="radio"
    ${isChecked ? 'checked' : '' }
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>
  `
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;//here we place the cartSummaryHTML into page




//for delleting products
document.querySelectorAll('.js-delete-link') 
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  })
});

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;//shorthand method -> const productId = element.dataset.productId
    updateDliveryOption(productId, deliveryOptionId);
    renderOrderSummary();//we just regenerated the whole HTML | a function can call/re-run itself = recursion  
  });
});

}

renderOrderSummary ();

