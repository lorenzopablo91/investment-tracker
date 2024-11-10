import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { StockMarketCardProps } from '../types/interfaces';

const StockMarketCard: React.FC<StockMarketCardProps> = ({ cedearsPesos, stockMarketPesos, cashPesos, cedearsDolares, stockMarketDolares, cashDolares, stockMarketTotal }) => {

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Balance de Inversiones</CardTitle>
        <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        {/* Total */}
        <div className="mb-6 text-3xl font-bold text-blue-600">
          ${stockMarketTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          <span className="text-sm text-muted-foreground ml-2">USD</span>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Desglose */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">CEDEARs</p>
              <div className="text-sm text-muted-foreground">
                <p className="text-xs">${cedearsPesos.toLocaleString()} ARS</p>
              </div>
            </div>
            <span className="text-lg font-semibold">
              ${cedearsDolares.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Acciones</p>
              <div className="text-sm text-muted-foreground">
                <p className="text-xs">${stockMarketPesos.toLocaleString()} ARS</p>
              </div>
            </div>
            <span className="text-lg font-semibold">
              ${stockMarketDolares.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Fondo Común de Inversión</p>
              <div className="text-sm text-muted-foreground">
                <p className="text-xs">${cashPesos.toLocaleString()} ARS</p>
              </div>
            </div>
            <span className="text-lg font-semibold">
              ${cashDolares.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="bg-sky-400 h-full"
              style={{ width: `${(cedearsDolares / stockMarketTotal) * 100}%` }}
            />
            <div
              className="bg-indigo-500 h-full"
              style={{ width: `${(stockMarketDolares / stockMarketTotal) * 100}%` }}
            />
            <div
              className="bg-cyan-600 h-full"
              style={{ width: `${(cashDolares / stockMarketTotal) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>CEDEARs <p>{((cedearsDolares / stockMarketTotal) * 100).toFixed(1)}%</p></span>
            <span>Acciones <p>{((stockMarketDolares / stockMarketTotal) * 100).toFixed(1)}%</p></span>
            <span>FCI <p>{((cashDolares / stockMarketTotal) * 100).toFixed(1)}%</p></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockMarketCard;