import { formatCurrency } from '../../scripts/utils/money.js';

console.log('text suite: formatCurrency')

console.log('converts cents into dollers');
//Basic test cases
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with zero');
//Edge test cases
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cents');
//Edge test cases
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('checks rounding of .4');
//Edge test cases
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}