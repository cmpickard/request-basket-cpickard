import type { BasketToken } from "../types";
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function createBasketName() {
  let result = '';

  for (let count = 0; count < 8; count++) {
    const randomIndex = Math.floor(Math.random() * 62);
    result += BASE62[randomIndex];
  }
  
  return result;
}

export function isValidBasketName(name: string) {
  // name must be between 8-25 chars and be alphanumeric
  const regex = /^[a-zA-Z0-9]{8,25}$/;
  return regex.test(name);
}

export function getBasketsFromStorage() {
  const tokens = Object.entries(localStorage).filter((entry: [string, string]) => {
    return /^basket_/.test(entry[0]);
  });

  const tokenArray = tokens.map((pair: [string, string]) => {
    const key: string = pair[0].replace('basket_', '');
    const value: string = pair[1];
    return Object.fromEntries([[key, value]]) as BasketToken;
  });

  return tokenArray;
}

/*
export function breakUpHeaderString(value) {

}

*/

/* TESTS FOR REGEX
let valid1 = 'asdfasdfjh4455';
let valid2 = '2345236896jlkasdfnasdflkn';
let invalid1 = '23452368966jlkasdfnasdflkn';
let invalid2 = '+4598naefldfn';

console.log(isValidBasketName(valid1))
console.log(isValidBasketName(valid2))
console.log(isValidBasketName(invalid1))
console.log(isValidBasketName(invalid2))
*/

/* TESTS FOR getBasketsFromStorage

let testStorage: Object = {
  'basket_4352345': 'n3452345',
  'basket_345n2l345nk': 'asdfno23423',
  'invalid1234kj1245': 'asdkjfhasldkjh'
};

console.log(getBasketsFromStorage());
*/