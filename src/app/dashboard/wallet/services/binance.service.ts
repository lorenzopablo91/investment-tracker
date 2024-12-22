import { API_CONFIG } from '@/lib/api';
import CryptoJS from 'crypto-js';
import { AccountInfo, CryptoData, CryptoMetadata, CryptoPrice } from '../types/interfaces';

const cryptoMetadata: CryptoMetadata = {
    'BTC': {
        name: 'Bitcoin',
        color: 'bg-orange-500'
    },
    'ETH': {
        name: 'Ethereum',
        color: 'bg-indigo-500'
    },
    'BNB': {
        name: 'Binance',
        color: 'bg-yellow-500'
    }
};

export const getCryptoData = async (): Promise<CryptoData[]> => {
    try {
        const balances = await getAccountBalances();

        const symbols = Object.keys(balances);

        const prices = await getCryptoPrices(symbols);

        return symbols
            .filter(symbol => cryptoMetadata[symbol])
            .map(symbol => ({
                name: cryptoMetadata[symbol].name,
                symbol: symbol,
                amount: balances[symbol],
                priceUSD: prices[symbol],
                valueUSD: balances[symbol] * prices[symbol],
                color: cryptoMetadata[symbol].color
            }));
    } catch (error) {
        // Mejorar el logging del error
        console.error('Error detallado:', error);
        if (error instanceof Error) {
            console.error('Mensaje del error:', error.message);
        }
        throw error; // Lanzar el error original para ver más detalles
    }
}

async function fetchCryptoPrice(symbol: string): Promise<CryptoPrice> {
    const response = await fetch(
        `${API_CONFIG.BINANCE.BASE_URL}/api/v3/ticker/price?symbol=${symbol}USDT`,
        {
            next: { revalidate: API_CONFIG.BINANCE.REVALIDATE_TIME },
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch price for ${symbol}`);
    }

    return await response.json();
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
        }, {} as Record<string, number>);

        return result;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        throw new Error('Unable to load cryptocurrency prices. Please try again later.');
    }
}

async function getBinanceServerTime(): Promise<number> {
    const response = await fetch(`${API_CONFIG.BINANCE.BASE_URL}/api/v3/time`);
    if (!response.ok) {
        throw new Error('Failed to fetch server time');
    }
    const data = await response.json();
    return data.serverTime;
}

async function getAccountBalances(): Promise<Record<string, number>> {
    try {
        // Obtener el tiempo del servidor de Binance
        const serverTime = await getBinanceServerTime();
        const recvWindow = 5000;

        const queryString = `timestamp=${serverTime}&recvWindow=${recvWindow}&omitZeroBalances=true`;
        const signature = CryptoJS.HmacSHA256(queryString, API_CONFIG.BINANCE.SECRET_KEY).toString();

        const url = `${API_CONFIG.BINANCE.BASE_URL}/api/v3/account?${queryString}&signature=${signature}`;

        const response = await fetch(url, {
            headers: {
                'X-MBX-APIKEY': API_CONFIG.BINANCE.API_KEY
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorBody
            });
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        const accountInfo: AccountInfo = await response.json();
        return accountInfo.balances.reduce((acc, curr) => {
            const totalBalance = parseFloat(curr.free) + parseFloat(curr.locked);
            if (totalBalance > 0) {
                return {
                    ...acc,
                    [curr.asset]: totalBalance
                };
            }
            return acc;
        }, {} as Record<string, number>);
    } catch (error) {
        console.error('Error en getAccountBalances:', error);
        throw error;
    }
}