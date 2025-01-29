import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InformationCircleIcon, WalletIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/ui/modal';
import { TotalCardProps } from '../types/interfaces';
import ButtonRefresh from '@/components/ui/button-refresh';

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
        <CardTitle className="flex items-center justify-between text-2xl font-bold">
          <span className="whitespace-nowrap">Balance Total</span>
          <div className="p-4">
            <Modal
              title="Balance Total"
              variant="info"
              icon={<InformationCircleIcon className="h-6 w-6" />}
            >
              550 USD son de LALY♥
            </Modal>
          </div>
        </CardTitle>

        <WalletIcon className="h-8 w-8 text-gray-600" />
        {/* Última actualización */}
        <div className="flex items-center justify-between">
          <ButtonRefresh />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-4xl font-bold text-gray-800">
          ${totalWallet.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          <span className="text-sm text-muted-foreground ml-2">USD</span>
        </div>

        {/* Desglose de categorías */}
        <div className="grid grid-cols-3 gap-4 mb-2">
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