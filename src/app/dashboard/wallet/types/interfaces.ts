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

export interface CryptoMetadata {
    [key: string]: {
      name: string;
      color: string;
    };
  }

export interface StockMarketData {
    cedears: number;
    stockMarket: number;
    cash: number;
    dollarQuote: number;
}

export interface CryptoCardProps {
    cryptos: Array<CryptoData>;
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
    contributionLaly: number;
}

export interface Balance {
    asset: string;
    free: string;
    locked: string;
}

export interface AccountInfo {
    balances: Balance[];
    permissions: string[];
}

export interface WalletData {
    dollarQuote: number;
    dollarAmount: {
        dollarsBanked: number;
        dollarCashed: number;
        dollarInvested: number;
    };
    stockMarketAmount: {
        cedearsPesos: number;
        stockMarketPesos: number;
        cashPesos: number;
    };
    contributionLaly: number;
}