export const orders = JSON.parse(localStorage.getItem('orders')) || [];
//[] empty array as a default value if nothing in order

export function addOrder(order) {
  //to add recent order at the top we'll place them at first of array
  orders.unshift(order)//by this line
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}