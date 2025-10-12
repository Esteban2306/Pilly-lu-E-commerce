'use client'

export function useCurrencyFormat() {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    })

    const formatCurrency = (value: number | string = 0) => {
        const num = typeof value === 'string' ? parseFloat(value) : value
        if (isNaN(num)) return 'COP 0'
        return formatter.format(num)
    }

    return { formatCurrency }
}