export const luhnCheck = (cardNumber: string): boolean => {
  if (!cardNumber.length) {
    return false;
  }

  // remove whitespace from card number
  cardNumber = cardNumber.replace(/\s/g, '');

  // LUHN'S ALGORITHM IMPLEMENTATION BELOW

  // 1. remove last digit
  const lastDigit = Number(cardNumber[cardNumber.length - 1]);

  // 2. reverse card number
  const reverseCardNumber = cardNumber
    .slice(0, cardNumber.length - 1)
    .split('')
    .reverse()
    .map((x) => Number(x));

  let sum = 0;

  // 3. multiply every digit in odd position by 2
  // 4. subtract 9 if digit > 9
  for (let i = 0; i < reverseCardNumber.length; i += 2) {
    reverseCardNumber[i] *= 2;
    if (reverseCardNumber[i] > 9) {
      reverseCardNumber[i] -= 9;
    }
  }

  // 5. add all numbers together
  sum = reverseCardNumber.reduce((acc, currValue) => acc + currValue, 0);

  // 6. add last digit to sum
  // 7. if sum is factor of 10, it is a valid card number
  return (sum + lastDigit) % 10 === 0;
};