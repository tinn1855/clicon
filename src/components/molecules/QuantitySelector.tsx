import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button, Input } from '../atoms';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
  onRemove?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showRemove?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    button: 'h-8 w-8 p-0',
    input: 'h-8 w-12 text-sm',
  },
  md: {
    button: 'h-10 w-10 p-0',
    input: 'h-10 w-14 text-base',
  },
  lg: {
    button: 'h-12 w-12 p-0',
    input: 'h-12 w-16 text-lg',
  },
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  onRemove,
  disabled = false,
  size = 'md',
  showRemove = false,
  className,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue) || newValue < min) {
      onChange(min);
    } else if (newValue > max) {
      onChange(max);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Decrease Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className={cn(sizeClasses[size].button, 'rounded-l-md rounded-r-none')}
      >
        <Minus className="h-3 w-3" />
      </Button>

      {/* Quantity Input */}
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min={min}
        max={max}
        disabled={disabled}
        className={cn(
          sizeClasses[size].input,
          'text-center rounded-none border-x-0 focus:border-x'
        )}
      />

      {/* Increase Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className={cn(sizeClasses[size].button, 'rounded-r-md rounded-l-none')}
      >
        <Plus className="h-3 w-3" />
      </Button>

      {/* Remove Button */}
      {showRemove && onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={disabled}
          className={cn(
            sizeClasses[size].button,
            'ml-2 text-destructive hover:text-destructive'
          )}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
