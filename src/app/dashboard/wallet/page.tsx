import React from 'react';
import TotalCard from './components/TotalCard';
import DollarCard from './components/DollarCard';
import StockCard from './components/StockCard';
import CryptoCard from './components/CryptoCard';

export default function Page() {
  // Estos valores deberían venir de una API
  const dollarTotal: number = 1277.34; // Total de DollarCard
  const stockTotal: number = 713.33;  // Total de StockCard
  const cryptoTotal: number = 1657.67; // Total de CryptoCard

  return (
    <main className="container mx-auto p-4">
      {/* Total Wallet Card */}
      <TotalCard
        dollarTotal={dollarTotal}
        stockTotal={stockTotal}
        cryptoTotal={cryptoTotal}
      />
      
      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DollarCard />
        <StockCard />
        <CryptoCard />
      </div>
    </main>
  );
}