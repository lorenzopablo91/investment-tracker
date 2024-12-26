export interface FinancialData {
    year: string;
    month: string;
    expenseDetails: {
        type: 'income' | 'expense';
        concept: string;
        amountARS: number;
        amountUSD?: number;
        fee?: {
            current: number;
            total: number;
        };
        selected: boolean;
    }[];
}

export interface MonthlyDetailsCardProps {
    data: FinancialData;
    onToggleSelection?: (index: number) => void;
}