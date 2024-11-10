export interface CryptoPrice {
    symbol: string;
    price: string;
}

export interface CryptoData {
    name: string;
    symbol: string;
    amount: number;
    priceUSD: number;
    color: string;
    valueUSD?: number;
}

export interface StockMarketData {
    cedears: number;
    stockMarket: number;
    cash: number;
    dollarQuote: number;
}

export interface CryptoCardProps {
    cryptosCompleted: Array<CryptoData>;
    cryptoTotal: number;
}

export interface DollarCardProps {
    banked: number;
    cashed: number;
    invested: number;
    total: number
}

export interface StockMarketCardProps {
    cedearsPesos: number;
    stockMarketPesos: number;
    cashPesos: number;
    cedearsDolares: number;
    stockMarketDolares: number;
    cashDolares: number;
    stockMarketTotal: number;
}

export interface TotalCardProps {
    dollarTotal: number;
    stockTotal: number;
    cryptoTotal: number;
}