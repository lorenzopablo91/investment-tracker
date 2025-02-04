'use client';

import React, { useState } from 'react';
import MonthlyDetailsCard from './components/MonthlyDetailsCard';
import { DatePicker } from '@/components/ui/date-picker';
import { balanceData } from './types/data';

export default function Page() {
  const getCurrentMonthData = () => {
    const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
    const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
    const currentYear = new Date().getFullYear().toString();
    
    const currentData = balanceData.find(
      data => data.month === capitalizedMonth && data.year === currentYear
    ) || balanceData[0];

    return {
      month: currentData.month,
      year: currentData.year
    };
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentMonthData());

  const handleToggleSelection = (index: number) => {
    const currentMonthData = balanceData.find(
      data => data.month === selectedDate.month && data.year === selectedDate.year
    );

    if (currentMonthData) {
      const newExpenseDetails = [...currentMonthData.expenseDetails];
      newExpenseDetails[index].selected = !newExpenseDetails[index].selected;
    }
  };

  const currentMonthData = balanceData.find(
    data => data.month === selectedDate.month && data.year === selectedDate.year
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {currentMonthData && (
        <MonthlyDetailsCard
          data={currentMonthData}
          onToggleSelection={handleToggleSelection}
        />
      )}
    </div>
  );
}