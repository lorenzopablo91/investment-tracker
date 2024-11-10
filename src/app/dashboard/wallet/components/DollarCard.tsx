import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { DollarCardProps } from '../types/interfaces';

const DollarCard: React.FC<DollarCardProps> = ({ banked, cashed, invested, total }) => {

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Balance en Dólares</CardTitle>
        <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
      </CardHeader>
      <CardContent>
        {/* Total */}
        <div className="mb-6 text-3xl font-bold text-green-600">
          ${total.toLocaleString()}
          <span className="text-sm text-muted-foreground ml-2">USD</span>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Desglose */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">Banco</p>
            <span className="text-lg font-semibold">${banked.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-medium">Efectivo</p>
            <span className="text-lg font-semibold">${cashed.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-medium">Invertido</p>
            <span className="text-lg font-semibold">${invested.toLocaleString()}</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="bg-teal-400 h-full"
              style={{ width: `${(banked / total) * 100}%` }}
            />
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${(cashed / total) * 100}%` }}
            />
            <div
              className="bg-lime-600 h-full"
              style={{ width: `${(invested / total) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Banco
              <p>
                {((banked / total) * 100).toFixed(1)}%
              </p>
            </span>
            <span>Efectivo
              <p>
                {((cashed / total) * 100).toFixed(1)}%
              </p>
            </span>
            <span>Invertido
              <p>
                {((invested / total) * 100).toFixed(1)}%
              </p>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DollarCard;