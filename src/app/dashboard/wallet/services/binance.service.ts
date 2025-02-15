import { API_CONFIG } from '@/lib/api';
import CryptoJS from 'crypto-js';
import { AccountInfo, CryptoData, CryptoPrice } from '../types/interfaces';
import { cryptoMetadata, MIN_USD_VALUE } from '../types/data';

export const getCryptoData = async (): Promise<CryptoData[]> => {
    try {
        const balances = await getAccountBalances();
        const symbols = Object.keys(balances);
        const prices = await getCryptoPrices(symbols);

        // Calcular valores en USD y filtrar
        const cryptoData = symbols
            .filter(symbol => cryptoMetadata[symbol])
            .map(symbol => {
                const amount = balances[symbol];
                const priceUSD = prices[symbol];
                const valueUSD = amount * priceUSD;

                return {
                    name: cryptoMetadata[symbol].name,
                    symbol: symbol,
                    amount,
                    priceUSD,
                    valueUSD,
                    color: cryptoMetadata[symbol].color
                };
            })
            .filter(crypto => crypto.valueUSD >= MIN_USD_VALUE);

        return cryptoData;
    } catch (error) {
        console.error('Error detallado:', error);
        if (error instanceof Error) {
            console.error('Mensaje del error:', error.message);
        }
        throw error;
    }
}

async function fetchCryptoPrice(symbol: string): Promise<CryptoPrice> {
    if (symbol === 'USDT') {
        return {
            symbol: 'USDTUSDT',
            price: '1.00'  // USDT está diseñado para mantener paridad con USD
        };
    }

    const url = `${API_CONFIG.BINANCE.BASE_URL}/api/v3/ticker/price?symbol=${symbol}USDT`;
    
    try {
        const response = await fetch(url, {
            next: { revalidate: API_CONFIG.BINANCE.REVALIDATE_TIME },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch price for ${symbol}:`, {
                status: response.status,
                statusText: response.statusText,
                url,
                errorText
            });
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
        throw error;
    }
}

export async function getCryptoPrices(symbols: string[]): Promise<Record<string, number>> {
    try {
        console.log('Fetching prices for symbols:', symbols);
        
        const pricePromises = symbols.map(symbol => 
            fetchCryptoPrice(symbol)
                .catch(error => {
                    console.error(`Failed to fetch ${symbol}:`, error);
                    return null;
                })
        );

        const prices = await Promise.all(pricePromises);
        
        const result = prices.reduce((acc, curr, index) => {
            if (curr === null) {
                console.warn(`Skipping ${symbols[index]} due to fetch error`);
                return acc;
            }
            const symbol = curr.symbol.replace('USDT', '');
            return {
                ...acc,
                [symbol]: parseFloat(curr.price)
            };
        }, {} as Record<string, number>);

        if (Object.keys(result).length === 0) {
            throw new Error('No cryptocurrency prices could be fetched');
        }

        console.log('Successfully fetched prices:', result);
        return result;
    } catch (error) {
        console.error('Detailed error in getCryptoPrices:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
    }
}

async function getAccountBalances(): Promise<Record<string, number>> {
    try {
        // 1. Obtener el tiempo del servidor
        const serverTime = await getBinanceServerTime();

        // 2. Calcular el offset entre el tiempo local y del servidor
        const timeOffset = serverTime - Date.now();

        // 3. Crear el timestamp ajustado
        const timestamp = Date.now() + timeOffset;
        const recvWindow = 60000; // 60 segundos

        // 4. Construir el query string con el timestamp ajustado
        const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow}&omitZeroBalances=true`;
        const signature = CryptoJS.HmacSHA256(queryString, API_CONFIG.BINANCE.SECRET_KEY).toString();

        const url = `${API_CONFIG.BINANCE.BASE_URL}/api/v3/account?${queryString}&signature=${signature}`;

        // 5. Hacer la petición
        const response = await fetch(url, {
            headers: {
                'X-MBX-APIKEY': API_CONFIG.BINANCE.API_KEY
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            const errorInfo = {
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
                timestamp,
                serverTime,
                localTime: Date.now(),
                timeOffset,
                recvWindow
            };
            console.error('Detailed error info:', errorInfo);
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

async function getBinanceServerTime(): Promise<number> {
    const response = await fetch(`${API_CONFIG.BINANCE.BASE_URL}/api/v3/time`, {
        cache: 'no-store' // Asegura que no se use caché
    });

    if (!response.ok) {
        throw new Error('Failed to fetch server time');
    }

    const data = await response.json();
    return data.serverTime;
}