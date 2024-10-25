import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WalletIcon } from '@heroicons/react/24/outline';

export interface TotalCardProps {
  dollarTotal: number;
  stockTotal: number;
  cryptoTotal: number;
}

const TotalCard: React.FC<TotalCardProps> = ({ dollarTotal, stockTotal, cryptoTotal }) => {
  const totalWallet = dollarTotal + stockTotal + cryptoTotal;
  
  const categories: Array<{ name: string; amount: number; color: string }> = [
    { name: 'Dólares', amount: dollarTotal, color: 'bg-green-500' },
    { name: 'Acciones', amount: stockTotal, color: 'bg-blue-500' },
    { name: 'Crypto', amount: cryptoTotal, color: 'bg-orange-500' }
  ];

  return (
    <Card className="w-full bg-white mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Balance Total de Billetera</CardTitle>
        <WalletIcon className="h-8 w-8 text-gray-600" />
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-4xl font-bold text-gray-800">
            ${totalWallet.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-muted-foreground">Total de todos los activos en USD</p>
        </div>

        {/* Desglose de categorías */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {categories.map(category => (
            <div key={category.name} className="text-center">
              <p className="text-sm text-muted-foreground">{category.name}</p>
              <p className="text-lg font-semibold">
                ${category.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground">
                {((category.amount / totalWallet) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
            {categories.map(category => (
              <div
                key={category.name}
                className={`${category.color} h-full transition-all duration-500`}
                style={{ width: `${(category.amount / totalWallet) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCard;