import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../atoms';
import { Button } from '../atoms';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  className?: string;
}

const searchSizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search products...',
  size = 'md',
  showClearButton = true,
  className,
}) => {
  const [searchValue, setSearchValue] = React.useState(value);

  React.useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onChange?.('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <Input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={cn(
          'pr-20 pl-4',
          searchSizes[size],
          'rounded-l-lg rounded-r-none border-r-0'
        )}
      />

      {showClearButton && searchValue && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}

      <Button
        type="button"
        onClick={handleSearch}
        className={cn('rounded-l-none rounded-r-lg px-4', searchSizes[size])}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};
