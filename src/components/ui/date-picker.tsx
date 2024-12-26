import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { DatePickerProps } from '../types/interfaces';

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const years = ['2024', '2025'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-[240px] flex items-center justify-between",
          "rounded-md border bg-card text-card-foreground",
          "h-10 px-3 py-2",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
      >
        <span>{value.month} {value.year}</span>
        <span className="text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 z-50 bg-white border rounded-md shadow-lg p-4 w-[240px]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Mes</label>
              <select
                value={value.month}
                onChange={(e) => onChange({ ...value, month: e.target.value })}
                className="w-full rounded-md border p-1 text-sm"
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
                className="w-full rounded-md border p-1 text-sm"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};