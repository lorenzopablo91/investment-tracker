import { API_CONFIG } from '@/lib/api';
import { CryptoPrice } from '../types/interfaces';

async function fetchCryptoPrice(symbol: string): Promise<CryptoPrice> {
    const response = await fetch(
        `${API_CONFIG.BINANCE.BASE_URL}/ticker/price?symbol=${symbol}USDT`,
        {
            next: { revalidate: API_CONFIG.BINANCE.REVALIDATE_TIME },
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch price for ${symbol}`);
    }

    return await response.json();;
}

export async function getCryptoPrices(symbols: string[]): Promise<Record<string, number>> {
    try {
        const prices = await Promise.all(
            symbols.map(symbol => fetchCryptoPrice(symbol))
        );

        const result = prices.reduce((acc, curr) => {
            const symbol = curr.symbol.replace('USDT', '');
            return {
                ...acc,
                [symbol]: parseFloat(curr.price)
            };
        }, {});

        return result;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        throw new Error('Unable to load cryptocurrency prices. Please try again later.');
    }
}