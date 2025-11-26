export function calcRentalPrice(productPrice, months) {
  if (!months) {
    return { monthlyFee: 0, deposit: 0, totalPrice: 0 };
  }
  if (!productPrice || productPrice <= 0) {
    throw new Error("상품 가격은 0보다 커야 합니다.");
  }

  const PRICE_INCREASE_RATE = 1.05;
  const DEPOSIT_RATE = 0.2;

  const adjustedPrice = productPrice * PRICE_INCREASE_RATE;
  let monthlyFee = adjustedPrice / months;
  let deposit = productPrice * DEPOSIT_RATE;
  let totalPrice = monthlyFee * months + deposit;

  const floorToTenWon = (value) => Math.floor(value / 10) * 10;

  return {
    monthlyFee: floorToTenWon(monthlyFee),
    deposit: floorToTenWon(deposit),
    totalPrice: floorToTenWon(totalPrice),
  };
}
