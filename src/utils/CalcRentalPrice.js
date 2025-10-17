export function calcRentalPrice(productPrice, months = 36) {
    if (!productPrice || productPrice <= 0 || months <= 0) {
        throw new Error("상품 가격과 개월 수는 0보다 커야 합니다.");
    }

    const PRICE_INCREASE_RATE = 1.05; // 5% 인상
    const DEPOSIT_RATE = 0.2; // 20%

    const adjustedPrice = productPrice * PRICE_INCREASE_RATE;
    let monthlyFee = adjustedPrice / months;
    let deposit = productPrice * DEPOSIT_RATE;
    let totalPrice = (monthlyFee * months) + deposit;

    const floorToTenWon = (value) => Math.floor(value / 10) * 10;

    monthlyFee = floorToTenWon(monthlyFee);
    deposit = floorToTenWon(deposit);
    totalPrice = floorToTenWon(totalPrice);

    return { monthlyFee, deposit, totalPrice };
}