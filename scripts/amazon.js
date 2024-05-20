// Arrays and objects combination are used to create data structure 
/* redirecting to products.js

-we save the data for website in a data structure like products.js
-then we use java script to generate the html using the data ( like from products.js)
*/
import { products } from '../data/products.js';
import { cart } from '../data/cart.js';
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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

//this will select all the add to cart buttons 
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;//dataset gives us all the data attribute that is attatched to this button | productId went kebab case to camel case and we got it from [data-product-id (<<-) ="${product.id}"]


    let matchingItem;//if we find a matching item we're going to save it here
    cart.forEach((item) => { //item (parameter) will contain product name and quantity
      if (productId === item.productId) {
        matchingItem = item;
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

    // add total cart quantity for homepage cart corner
    let cartQuantity = 0;
    
    cart.forEach((item) => {
      cartQuantity += item.quantity;
      
    });
    
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});