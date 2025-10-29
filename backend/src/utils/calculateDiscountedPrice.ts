export function calculateDiscountedPrice(price: number, offer: string | number) {
    if (offer === undefined || offer === null) {
        return { finalPrice: price, discountAmount: 0, percent: 0 };
    }

    if (typeof offer === "string" && offer.includes("%")) {
        const percent = parseFloat(offer.replace("%", "").trim());
        const discountAmount = (price * percent) / 100;
        return {
            finalPrice: Math.max(price - discountAmount, 0),
            discountAmount,
            percent,
        };
    }

    const numericOffer = typeof offer === "string" ? parseFloat(offer.trim()) : offer;

    if (isNaN(numericOffer)) {
        return { finalPrice: price, discountAmount: 0, percent: 0 };
    }

    const discountAmount = numericOffer;
    const percent = (numericOffer / price) * 100;

    return {
        finalPrice: Math.max(price - discountAmount, 0),
        discountAmount,
        percent,
    };
}