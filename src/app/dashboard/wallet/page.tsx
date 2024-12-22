import React from 'react';
import TotalCard from './components/TotalCard';
import DollarCard from './components/DollarCard';
import StockMarketCard from './components/StockMarketCard';
import CryptoCard from './components/CryptoCard';
import { getCryptoData } from './services/binance.service';

export const dynamic = 'force-dynamic';

//secret_key = aXXd7LNMQqfLQcJ8FV8kUFp0croAtEgJc4Ha9BcI22Z295H98VIBIZsKQ82gqD0L
//api_key = Is7ZaIcufmvuNuHJsRzdWIBngigfx7b8ztsYMHpKbWcnPL4lKlgf47w1X30CtfOY

export default async function Page() {
  // Dollar Card
  const dollarsBanked: number = 1135.46;
  const dollarCashed: number = 300;
  const dollarInvested: number = 336.20;

  // Stock Market Card
  const dollarQuote: number = 1150;
  const cedearsPesos: number = 616000;
  const stockMarketPesos: number = 430000;
  const cashPesos: number = 100000;
  const cedearsDolares = cedearsPesos / dollarQuote;
  const stockMarketDolares = stockMarketPesos / dollarQuote;
  const cashDolares = cashPesos / dollarQuote;

  const cryptos = await getCryptoData();

  // Calcular totales
  const dollarTotal: number = dollarsBanked + dollarCashed + dollarInvested;
  const stockMarketTotal: number = cedearsDolares + stockMarketDolares + cashDolares;
  const cryptoTotal: number = cryptos.reduce((acc, curr) => acc + (curr?.valueUSD || 0), 0);

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
          cryptos={cryptos}
          cryptoTotal={cryptoTotal}
        />
      </div>
    </main>
  );
}