import React from 'react';
import { cn } from "@/lib/utils";
import { DatePickerProps } from '../types/interfaces';

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const years = ['2024', '2025'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="text-sm font-medium mb-2 block">Mes</label>
        <select
          value={value.month}
          onChange={(e) => onChange({ ...value, month: e.target.value })}
          className={cn(
            "h-10 rounded-md border bg-card text-card-foreground px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "min-w-[140px]"
          )}
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Año</label>
        <select
          value={value.year}
          onChange={(e) => onChange({ ...value, year: e.target.value })}
          className={cn(
            "h-10 rounded-md border bg-card text-card-foreground px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "min-w-[100px]"
          )}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};