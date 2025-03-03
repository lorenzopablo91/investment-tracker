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
    grossSalary: number;
    dollarAmount: number;
}

export interface MonthlyDetailsCardProps {
    data: FinancialData;
    onToggleSelection?: (index: number) => void;
}

export interface FinancialItem {
    type: "income" | "expense";
    concept: string;
    amountARS: number;
    amountUSD?: number;
    fee?: { current: number; total: number; };
    selected: boolean;
}

export interface FinancialData {
    month: string;
    year: string;
    grossSalary: number;
    expenseDetails: FinancialItem[];
    maxSalaryLastSixMonth?: number;
}

export interface MonthlyBalanceCardProps {
    data: FinancialData;
    onToggleSelection: (index: number) => void;
}

export interface SavingsEditorModalProps {
    savings: number;
    formatARS: (amount: number) => string;
}