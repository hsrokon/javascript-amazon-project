export const deliveryOptions = [{
  id: '1',
  deliveryDays : 7,
  priceCents: 0
},
{
  id : '2',
  deliveryDays : 3,
  priceCents : 499 
},
{
  id : '3',
  deliveryDays : 1,
  priceCents : 999 
}];

export function getDeliveryOption (deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach ((option) => {
    if (option.id === deliveryOptionId) {// between deliveryOptions delivery id and cart's deliveryOptionId
      deliveryOption = option;//than we transfer every deliveryOptions data to deliveryOption
    }
  });
  return deliveryOption || deliveryOptions[0];
}