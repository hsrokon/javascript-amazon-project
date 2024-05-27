import { formatCurrency } from '../scripts/utils/money.js';

describe ('text suite: formatCurrency', () => {//this describe function is provided by Jasminewhich creates a test suite

  it ('converts cents into dollers', () => {//'it'another function from jasmine which creates a test 
    
    expect(formatCurrency(2095)).toEqual('20.95');//'expect'another function from Jasmine which compares a value to another value
  });

  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cents', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })
});