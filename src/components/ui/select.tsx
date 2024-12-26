import { cn } from "@/lib/utils";
import { SelectProps } from "../types/interfaces";

export const Select = ({ value, onChange, options, label }: SelectProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "rounded-md border bg-card text-card-foreground",
        "h-10 px-3 py-2",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);