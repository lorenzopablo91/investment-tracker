import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { MonthlyDetailsCardProps } from '../types/interfaces';

export const MonthlyDetailsCard = ({ data, onToggleSelection }: MonthlyDetailsCardProps) => {
  const financialSummary = useMemo(() => {
    const totals = data.expenseDetails.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income += item.amountARS;
        } else {
          acc.expense += item.amountARS;
          acc.amountUSD += item?.amountUSD || 0;
        }
        return acc;
      },
      { income: 0, expense: 0, amountUSD: 0 }
    );

    return {
      ...totals,
      result: totals.income - totals.expense,
      expenseUSD: totals.amountUSD
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalle de {data.month} {data.year}</CardTitle>
        <CardDescription>
          Desglose de ingresos, egresos y gastos del mes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Ingresos (ARS):</span>
                <span className="font-medium text-green-600">
                  {financialSummary.income.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Egresos (ARS):</span>
                <span className="font-medium text-red-600">
                  {financialSummary.expense.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Resultado (ARS):</span>
                <span className={cn(
                  "font-medium",
                  financialSummary.result >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {financialSummary.result.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Consumos (USD):</span>
                <span className={cn(
                  "font-medium", "text-red-600"
                )}>
                  {financialSummary.expenseUSD.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-4 text-lg">Detalle de Movimientos</h3>
            <div>
              <div className="grid grid-cols-[30px_repeat(4,_1fr)] items-center mb-2">
                <span></span>
                <span className="font-medium pl-2">Concepto</span>
                <span className="font-medium pl-2">Cuota</span>
                <span className="font-medium">Monto (ARS)</span>
                <span className="font-medium">Consumo (USD)</span>
              </div>

              <div className="space-y-1">
                {data.expenseDetails.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "grid grid-cols-[30px_repeat(4,_1fr)] items-center py-3",
                      item.selected ? "bg-blue-50" : "hover:bg-gray-50"
                    )}
                  >
                    <span className="flex justify-center">
                      <input
                        disabled
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => onToggleSelection?.(index)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </span>
                    <span className="pl-2 text-gray-900">{item.concept}</span>
                    <span className="pl-2 text-gray-600">
                      {item.fee && `${item.fee.current}/${item.fee.total}`}
                    </span>
                    <span className={cn(
                      "",
                      item.type === 'income' ? "text-green-600" : "text-red-600"
                    )}>
                      {item.amountARS.toLocaleString()}
                    </span>
                    <span className={cn(
                      "", "text-red-600"
                    )}>
                      {item.amountUSD && item.amountUSD.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyDetailsCard;