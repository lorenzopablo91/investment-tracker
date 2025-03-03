import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { CryptoCardProps } from '../types/interfaces';

const CryptoCard: React.FC<CryptoCardProps> = ({ cryptos, cryptoTotal }) => {

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Balance Criptomonedas</CardTitle>
        <ArrowsRightLeftIcon className="h-6 w-6 text-orange-500" />
      </CardHeader>
      <CardContent>
        {/* Total */}
        <div className="mb-6 text-3xl font-bold text-orange-500">
          ${cryptoTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          <span className="text-sm text-muted-foreground ml-2">USD</span>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Desglose */}
        <div className="space-y-4">
          {cryptos.map(crypto => (
            <div key={crypto.symbol} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{crypto.name}</p>
                <div className="text-sm text-muted-foreground">
                  <p className="text-xs">
                    Precio: ${crypto.priceUSD.toLocaleString()} USD
                  </p>
                </div>
              </div>
              <span className="text-lg font-semibold">
                ${crypto.valueUSD?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
            {cryptos.map(crypto => (
              <div
                key={crypto.symbol}
                className={`${crypto.color} h-full`}
                style={{ width: `${(crypto.valueUSD || 0 / cryptoTotal) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {cryptos.map(crypto => (
              <span key={crypto.symbol}>{crypto.symbol} <p>{(((crypto.valueUSD || 0) / cryptoTotal) * 100).toFixed(1)}%</p></span>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default CryptoCard;