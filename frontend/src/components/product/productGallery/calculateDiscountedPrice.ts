export function calculateDiscountedPrice(price: number, offer: string | number) {
    if (!offer) return { finalPrice: price, discountAmount: 0, percent: 0 };

    if (typeof offer === 'string' && offer.includes('%')) {
        const percent = parseFloat(offer);
        const discountAmount = (price * percent) / 100;
        return { finalPrice: price - discountAmount, discountAmount, percent };
    }

    if (typeof offer === 'number') {
        const discountAmount = offer;
        const percent = (offer / price) * 100;
        return { finalPrice: price - discountAmount, discountAmount, percent };
    }

    return { finalPrice: price, discountAmount: 0, percent: 0 };
}