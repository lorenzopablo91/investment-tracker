import { type VariantProps } from "class-variance-authority"
import React, { ReactNode } from 'react';
import { buttonVariants } from "../ui/button";
import { ButtonVariant, ModalSize } from "../ui/modal";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export interface DatePickerProps {
    value: { month: string; year: string };
    onChange: (value: { month: string; year: string }) => void;
}

export interface ModalProps {
    buttonText?: string;
    title: string;
    children: ReactNode;
    icon?: ReactNode;
    size?: ModalSize;
    variant?: ButtonVariant;
    buttonSize?: 'default' | 'sm' | 'lg';
    className?: string;
}

export interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    label: string;
}