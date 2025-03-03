import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SavingsEditorModalProps } from '../types/interfaces';

const SavingsEditorModal: React.FC<SavingsEditorModalProps> = ({ savings, formatARS }) => {
  const [customSavings, setCustomSavings] = useState<number>(savings);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>(savings.toFixed(2));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números y un punto decimal
    const value = e.target.value.replace(/[^0-9.]/g, '');
    
    // Asegurarse de que solo hay un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limitar a 2 decimales
    if (parts.length === 2 && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      setInputValue(parts.join('.'));
    } else {
      setInputValue(value);
    }
  };

  const handleSave = () => {
    // Convertir el valor del input a número
    const numValue = parseFloat(inputValue) || 0;
    setCustomSavings(numValue);
    setIsEditing(false);
  };

  const handleReset = () => {
    setInputValue(savings.toFixed(2));
    setCustomSavings(savings);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(true);
  };

  const modalContent = isEditing ? (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        ¿Deseas personalizar el valor de ahorros?
      </p>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-right font-medium"
        />
        <span className="text-sm text-gray-500">ARS</span>
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" size="sm" onClick={handleSave}>
          Continuar
        </Button>
        {customSavings !== savings && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Restablecer
          </Button>
        )}
      </div>
    </div>
  ) : (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 p-2">
        <div className="flex justify-between items-center border-b border-blue-200 pb-2">
          <span className="font-medium text-gray-700">CRIPTOMONEDAS:</span>
          <span className="font-bold text-blue-600">{formatARS(customSavings * 0.4)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-blue-200 pb-2">
          <span className="font-medium text-gray-700">ACCIONES:</span>
          <span className="font-bold text-green-600">{formatARS(customSavings * 0.4)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">DOLAR BANCO:</span>
          <span className="font-bold text-amber-600">{formatARS(customSavings * 0.2)}</span>
        </div>
      </div>
      <div className="flex justify-start pt-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          Editar valor
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      title={isEditing ? "Personalizar Ahorros" : "Distribución inversión"}
      variant="info"
      icon={<InformationCircleIcon className="h-6 w-6" />}
    >
      {modalContent}
    </Modal>
  );
};

export default SavingsEditorModal;