'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MonthlyBalanceCardProps } from '../types/interfaces';
import SavingsEditorModal from './SavingsEditorModal';

// Constantes para los cálculos
const RETIREMENT = 0.11;
const SOCIAL_SECURITY = 0.03;
const LAW_19032 = 0.03;

// Constantes para los porcentajes de gastos y ahorros
const FIXED_EXPENSES_PERCENT = 0.50;
const VARIABLE_EXPENSES_PERCENT = 0.30;
const SAVINGS_PERCENT = 0.20;

const MonthlyBalanceCard: React.FC<MonthlyBalanceCardProps> = ({ data }) => {
    // Cálculos de salario
    const calculateNetSalaryARS = (grossSalary: number) => {
        const retirement = grossSalary * RETIREMENT;
        const socialSecurity = grossSalary * SOCIAL_SECURITY;
        const law19032 = grossSalary * LAW_19032;
        return grossSalary - retirement - socialSecurity - law19032;
    };

    const calculateNetSalaryUSD = (netSalaryARS: number) => {
        return netSalaryARS / data.dollarAmount;
    };

    // Calcular valores
    const netSalaryARS = calculateNetSalaryARS(data.grossSalary);
    const netSalaryUSD = calculateNetSalaryUSD(netSalaryARS);

    // Cálculos de gastos usando los porcentajes fijos
    const fixedExpenses = netSalaryARS * FIXED_EXPENSES_PERCENT;
    const variableExpenses = netSalaryARS * VARIABLE_EXPENSES_PERCENT;
    const savings = netSalaryARS * SAVINGS_PERCENT;

    // Verificar si el mes actual es julio o diciembre para mostrar aguinaldo
    const showAguinaldo = data.month === 'Julio' || data.month === 'Diciembre';
    const aguinaldo = calculateNetSalaryARS(data.maxSalaryLastSixMonth || 0) / 12 * 6;
    const aguinaldoUSD = aguinaldo / data.dollarAmount;

    // Formateador de moneda
    const formatARS = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    };

    const formatUSD = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de Salario */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Salario - {data.month} {data.year}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Bruto:</span>
                            <span className="font-bold">{formatARS(data.grossSalary)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Neto (ARS):</span>
                            <span className="font-bold">{formatARS(netSalaryARS)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Neto (USD):</span>
                            <span className="font-bold text-green-600">{formatUSD(netSalaryUSD)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tarjeta de Gastos */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Gastos y Ahorros Sugeridos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <span className="font-medium">Gastos Fijos:</span>
                                <span className="text-xs ml-2 text-gray-500">
                                    {(FIXED_EXPENSES_PERCENT * 100).toFixed(0)}%
                                </span>
                            </div>
                            <span className="font-bold text-red-500">{formatARS(fixedExpenses)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <span className="font-medium">Gastos Variables:</span>
                                <span className="text-xs ml-2 text-gray-500">
                                    {(VARIABLE_EXPENSES_PERCENT * 100).toFixed(0)}%
                                </span>
                            </div>
                            <span className="font-bold text-orange-500">{formatARS(variableExpenses)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="font-medium">Ahorros:</span>
                                <span className="text-xs ml-2 text-gray-500">
                                    {(SAVINGS_PERCENT * 100).toFixed(0)}%
                                </span>
                                <div className="ml-2">
                                    <SavingsEditorModal savings={savings} formatARS={formatARS} />
                                </div>
                            </div>
                            <span className="font-bold text-blue-600">{formatARS(savings)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tarjeta de Aguinaldo (solo visible en julio y diciembre) */}
            {showAguinaldo && (
                <Card className="md:col-span-1 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-700">Aguinaldo (SAC)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="font-medium">Aguinaldo (ARS):</span>
                                <span className="font-bold">{formatARS(aguinaldo)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Aguinaldo (USD):</span>
                                <span className="font-bold text-green-600">{formatUSD(aguinaldoUSD)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MonthlyBalanceCard;