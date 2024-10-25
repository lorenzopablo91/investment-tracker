import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const DollarCard = () => {
  // Estos valores deberían venir como props o de tu estado global
  const dolaresBanco = 645.14;
  const dolaresBilletes = 300;
  const dolaresInvertidos = 332.20;
  
  const totalDolares = dolaresBanco + dolaresBilletes + dolaresInvertidos;

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Balance en Dólares</CardTitle>
        <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
      </CardHeader>
      <CardContent>
        {/* Total */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-green-600">
            ${totalDolares.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Balance total en USD</p>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Desglose */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Banco</p>
              <p className="text-sm text-muted-foreground">
                {((dolaresBanco / totalDolares) * 100).toFixed(1)}% del total
              </p>
            </div>
            <span className="text-lg font-semibold">${dolaresBanco.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Efectivo</p>
              <p className="text-sm text-muted-foreground">
                {((dolaresBilletes / totalDolares) * 100).toFixed(1)}% del total
              </p>
            </div>
            <span className="text-lg font-semibold">${dolaresBilletes.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Invertido</p>
              <p className="text-sm text-muted-foreground">
                {((dolaresInvertidos / totalDolares) * 100).toFixed(1)}% del total
              </p>
            </div>
            <span className="text-lg font-semibold">${dolaresInvertidos.toLocaleString()}</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div 
              className="bg-blue-500 h-full"
              style={{ width: `${(dolaresBanco / totalDolares) * 100}%` }}
            />
            <div 
              className="bg-green-500 h-full"
              style={{ width: `${(dolaresBilletes / totalDolares) * 100}%` }}
            />
            <div 
              className="bg-purple-500 h-full"
              style={{ width: `${(dolaresInvertidos / totalDolares) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Banco</span>
            <span>Efectivo</span>
            <span>Invertido</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DollarCard;