import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const CryptoCard = () => {
  // Estos valores deberían venir de una API o estado global
  const cryptos = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.01248511,
      priceUSD: 68639.99, // Precio actual de 1 BTC en USD
      color: 'bg-orange-500'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 0.09226684,
      priceUSD: 2553.60, // Precio actual de 1 ETH en USD
      color: 'bg-indigo-500'
    },
    {
      name: 'Binance',
      symbol: 'BNB',
      amount: 0.26614746,
      priceUSD: 594.70, // Precio actual de 1 BNB en USD
      color: 'bg-yellow-500'
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      amount: 2.29807844,
      priceUSD: 177.02, // Precio actual de 1 SOL en USD
      color: 'bg-purple-500'
    }
  ];

  // Calcular valores en USD y total
  const cryptosWithValues = cryptos.map(crypto => ({
    ...crypto,
    valueUSD: crypto.amount * crypto.priceUSD
  }));
  
  const totalUSD = cryptosWithValues.reduce((acc, curr) => acc + curr.valueUSD, 0);

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Balance de Criptomonedas</CardTitle>
        <ArrowsRightLeftIcon className="h-6 w-6 text-orange-500" />
      </CardHeader>
      <CardContent>
        {/* Total */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-orange-500">
            ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-muted-foreground">Balance total en USD</p>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Desglose */}
        <div className="space-y-4">
          {cryptosWithValues.map(crypto => (
            <div key={crypto.symbol} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{crypto.name}</p>
                <div className="text-sm text-muted-foreground">
                  <p>{((crypto.valueUSD / totalUSD) * 100).toFixed(1)}% del total</p>
                  <p className="text-xs">
                    {crypto.amount.toLocaleString(undefined, { maximumFractionDigits: 8 })} {crypto.symbol}
                  </p>
                  <p className="text-xs">
                    Precio: ${crypto.priceUSD.toLocaleString()} USD
                  </p>
                </div>
              </div>
              <span className="text-lg font-semibold">
                ${crypto.valueUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
            {cryptosWithValues.map(crypto => (
              <div 
                key={crypto.symbol}
                className={`${crypto.color} h-full`}
                style={{ width: `${(crypto.valueUSD / totalUSD) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {cryptosWithValues.map(crypto => (
              <span key={crypto.symbol}>{crypto.symbol}</span>
            ))}
          </div>
        </div>

        {/* Última actualización */}
        <div className="mt-4 text-xs text-right text-muted-foreground">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;