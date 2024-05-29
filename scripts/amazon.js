// Arrays and objects combination are used to create data structure 
/* redirecting to products.js

-we save the data for website in a data structure like products.js
-then we use java script to generate the html using the data ( like from products.js)
*/
import { products } from '../data/products.js';
import { cart, addToCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
//..represents outside of the current folder | / goint to the desired folder | load the path | imports will bw at the top of the file | get modules to work we've to open with live server

//combining all the html together
let productsHTML ='';

//takes each objects one by one and runs the function
//we generated the html for the page(3 times as 3 objects in the array)
products.forEach ((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

//Using DOM
document.querySelector('.js-products-grid').innerHTML = productsHTML;//changing inner html of .js-pro...rid into productsHTML

function updateCartQuantity () {
   // add total cart quantity for homepage cart corner
   let cartQuantity = 0; 
   cart.forEach((cartItem) => {//by forEach we enter into cart and save data into cartItem (parameter)
     cartQuantity += cartItem.quantity; //here we access just quantity from the parameter above
   });
   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

//this will select all the add to cart buttons 
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;//dataset gives us all the data attribute that is attatched to this button | productId went kebab case to camel case and we got it from [data-product-id (<<-) ="${product.id}"]
    addToCart(productId);
    updateCartQuantity();
  });
});