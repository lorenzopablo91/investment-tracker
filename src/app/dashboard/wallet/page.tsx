import React from 'react';
import TotalCard from './components/TotalCard';
import DollarCard from './components/DollarCard';
import StockMarketCard from './components/StockMarketCard';
import CryptoCard from './components/CryptoCard';
import { getCryptoPrices } from './services/binance.service';
import { CryptoData } from './types/interfaces';

export default async function Page() {
  // Dollar Card
  const dollarsBanked: number = 626.46;
  const dollarCashed: number = 300;
  const dollarInvested: number = 334.20;

  // Stock Market Card
  const dollarQuote: number = 1150;
  const cedearsPesos: number = 780000;
  const stockMarketPesos: number = 80000;
  const cashPesos: number = 100000;
  const cedearsDolares = cedearsPesos / dollarQuote;
  const stockMarketDolares = stockMarketPesos / dollarQuote;
  const cashDolares = cashPesos / dollarQuote;

  // Crypto Card
  const cryptoBase: CryptoData[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.01248511,
      priceUSD: 0,
      color: 'bg-orange-500'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 0.09226684,
      priceUSD: 0,
      color: 'bg-indigo-500'
    },
    {
      name: 'Binance',
      symbol: 'BNB',
      amount: 0.26614746,
      priceUSD: 0,
      color: 'bg-yellow-500'
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      amount: 2.19207844,
      priceUSD: 0,
      color: 'bg-purple-500'
    }
  ];
  const symbols = cryptoBase.map(crypto => crypto.symbol);
  const prices = await getCryptoPrices(symbols);

  // Actualizar cryptos con precios de la API
  const cryptosCompleted = cryptoBase.map(crypto => ({
    ...crypto,
    priceUSD: prices[crypto.symbol],
    valueUSD: crypto.amount * prices[crypto.symbol]
  }));

  // Calcular totales
  const dollarTotal: number = dollarsBanked + dollarCashed + dollarInvested;
  const stockMarketTotal: number = cedearsDolares + stockMarketDolares + cashDolares;
  const cryptoTotal: number = cryptosCompleted.reduce((acc, curr) => acc + curr.valueUSD, 0);

  return (
    <main className="container mx-auto p-4">
      <TotalCard
        dollarTotal={dollarTotal}
        stockTotal={stockMarketTotal}
        cryptoTotal={cryptoTotal}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DollarCard
          banked={dollarsBanked}
          cashed={dollarCashed}
          invested={dollarInvested}
          total={dollarTotal}
        />
        <StockMarketCard
          cedearsPesos={cedearsPesos}
          stockMarketPesos={stockMarketPesos}
          cashPesos={cashPesos}
          cedearsDolares={cedearsDolares}
          stockMarketDolares={stockMarketDolares}
          cashDolares={cashDolares}
          stockMarketTotal={stockMarketTotal}
        />
        <CryptoCard
          cryptosCompleted={cryptosCompleted}
          cryptoTotal={cryptoTotal}
        />
      </div>
    </main>
  );
}