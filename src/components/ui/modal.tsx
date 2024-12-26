import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ModalProps } from '../types/interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ModalSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'info';

const Modal = ({
  buttonText,
  title,
  children,
  icon,
  size = "sm",
  variant = "info",
  buttonSize = "default",
  className
}: ModalProps) => {
  const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={buttonSize}
          className={cn(className, "gap-2")}
        >
          {icon}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${sizeClasses[size]} p-6`}>
        <DialogHeader className="flex flex-row items-center gap-2">
          {icon && <span className="text-foreground">{icon}</span>}
          <DialogTitle className='pb-1'>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {children}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;