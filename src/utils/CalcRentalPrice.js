// 월 렌탈료 계산 (백엔드 RentalPriceCalculator 기반)
export function calcRentalPrice(productPrice, months = 36) {
    if (!productPrice || productPrice <= 0 || months <= 0) {
        throw new Error("상품 가격과 개월 수는 0보다 커야 합니다.");
    }

    const PRICE_INCREASE_RATE = 0.005; // 5% 인상
    const DEPOSIT_RATE = 0.2; // 20%

    const adjustedPrice = productPrice * PRICE_INCREASE_RATE;
    console.log(adjustedPrice)
    // 월 렌탈료 계산
    let monthlyFee = (productPrice / months) + adjustedPrice;
    // 보증금 계산
    let deposit = productPrice * DEPOSIT_RATE;
    // 총 렌탈가
    let totalPrice = monthlyFee * months;

    // 10원 단위 내림 (버림)
    const floorToTenWon = (value) => Math.floor(value / 10) * 10;

    monthlyFee = floorToTenWon(monthlyFee);
    deposit = floorToTenWon(deposit);
    totalPrice = floorToTenWon(totalPrice);

    return {
        monthlyFee,
        deposit,
        totalPrice,
    };
}
