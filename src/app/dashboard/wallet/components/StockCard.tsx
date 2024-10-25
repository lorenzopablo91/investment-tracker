import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const StockCard = () => {
  // Estos valores deberían venir como props o de tu estado global
  const cotizacionDolar = 1200; // Valor ejemplo del dólar
  
  // Valores en pesos
  const cedearsPesos = 778000;
  const accionesPesos = 77000;
  const efectivoPesos = 1000;
  
  // Conversión a dólares
  const cedearsDolares = cedearsPesos / cotizacionDolar;
  const accionesDolares = accionesPesos / cotizacionDolar;
  const efectivoDolares = efectivoPesos / cotizacionDolar;
  
  const totalDolares = cedearsDolares + accionesDolares + efectivoDolares;

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Balance de Inversiones</CardTitle>
        <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        {/* Total */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-blue-600">
            ${totalDolares.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-muted-foreground">Balance total en USD (1 USD = ${cotizacionDolar.toLocaleString()} ARS)</p>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Desglose */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">CEDEARs</p>
              <div className="text-sm text-muted-foreground">
                <p>{((cedearsDolares / totalDolares) * 100).toFixed(1)}% del total</p>
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
                <p>{((accionesDolares / totalDolares) * 100).toFixed(1)}% del total</p>
                <p className="text-xs">${accionesPesos.toLocaleString()} ARS</p>
              </div>
            </div>
            <span className="text-lg font-semibold">
              ${accionesDolares.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Efectivo</p>
              <div className="text-sm text-muted-foreground">
                <p>{((efectivoDolares / totalDolares) * 100).toFixed(1)}% del total</p>
                <p className="text-xs">${efectivoPesos.toLocaleString()} ARS</p>
              </div>
            </div>
            <span className="text-lg font-semibold">
              ${efectivoDolares.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div 
              className="bg-indigo-500 h-full"
              style={{ width: `${(cedearsDolares / totalDolares) * 100}%` }}
            />
            <div 
              className="bg-blue-500 h-full"
              style={{ width: `${(accionesDolares / totalDolares) * 100}%` }}
            />
            <div 
              className="bg-cyan-500 h-full"
              style={{ width: `${(efectivoDolares / totalDolares) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>CEDEARs</span>
            <span>Acciones</span>
            <span>Efectivo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;