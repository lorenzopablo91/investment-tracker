import React from 'react';
import TotalCard from './components/TotalCard';
import DollarCard from './components/DollarCard';
import StockMarketCard from './components/StockMarketCard';
import CryptoCard from './components/CryptoCard';

export default function Page() {
  // TODO:Estos valores deberían venir de una API
  // Dollar Card
  const dollarsBanked: number = 725.14;
  const dollarCashed: number = 300;
  const dollarInvested: number = 334.20;

  // Stock Card
  const dollarQuote: number = 1200;
  const cedearsPesos: number = 770000;
  const stockMarketPesos: number = 80000;
  const cashPesos: number = 100000;
  const cedearsDolares = cedearsPesos / dollarQuote;
  const stockMarketDolares = stockMarketPesos / dollarQuote;
  const cashDolares = cashPesos / dollarQuote;

  // Crypto Card
  const cryptos = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.01248511,
      priceUSD: 69639.99, // Precio actual de 1 BTC en USD
      color: 'bg-orange-500'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 0.09226684,
      priceUSD: 2485.60, // Precio actual de 1 ETH en USD
      color: 'bg-indigo-500'
    },
    {
      name: 'Binance',
      symbol: 'BNB',
      amount: 0.26614746,
      priceUSD: 567.70, // Precio actual de 1 BNB en USD
      color: 'bg-yellow-500'
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      amount: 2.19207844,
      priceUSD: 163.02, // Precio actual de 1 SOL en USD
      color: 'bg-purple-500'
    }
  ];

  // Calcular valores en USD y total
  const cryptosCompleted = cryptos.map(crypto => ({
    ...crypto,
    valueUSD: crypto.amount * crypto.priceUSD
  }));

  // Total Card
  const dollarTotal: number = dollarsBanked + dollarCashed + dollarInvested;
  const stockMarketTotal: number = cedearsDolares + stockMarketDolares + cashDolares;
  const cryptoTotal: number = cryptosCompleted.reduce((acc, curr) => acc + curr.valueUSD, 0);

  return (
    <main className="container mx-auto p-4">
      {/* Total Wallet Card */}
      <TotalCard
        dollarTotal={dollarTotal}
        stockTotal={stockMarketTotal}
        cryptoTotal={cryptoTotal}
      />

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DollarCard
          dollarsBanked={dollarsBanked}
          dollarCashed={dollarCashed}
          dollarInvested={dollarInvested}
          dollarTotal={dollarTotal}
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