import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { MonthlyDetailsCardProps } from '../types/interfaces';

export const MonthlyDetailsCard = ({ data, onToggleSelection }: MonthlyDetailsCardProps) => {
  // Calcular los totales
  const totalARS = data.expenseDetails.reduce((sum, item) => {
    // Si es un ingreso, sumamos; si es un gasto, restamos
    const multiplier = item.type === 'income' ? 1 : -1;
    return sum + (item.amountARS * multiplier);
  }, 0);

  const totalUSD = data.expenseDetails.reduce((sum, item) => {
    return sum + (item.amountUSD || 0);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos fijos mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
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

                {/* Fila de totales */}
                <div className="grid grid-cols-[30px_repeat(4,_1fr)] items-center py-3 mt-2 border-t border-gray-200 font-semibold">
                  <span></span>
                  <span className="pl-2">Total</span>
                  <span></span>
                  <span className={cn(
                    totalARS >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {Math.abs(totalARS).toLocaleString()}
                  </span>
                  <span className="text-red-600">
                    {totalUSD.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyDetailsCard;