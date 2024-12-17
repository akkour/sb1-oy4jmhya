import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Airport } from '../../types';

interface AutocompleteInputProps {
  label: string;
  icon?: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: Airport) => void;
  options: Airport[];
  placeholder?: string;
}

export function AutocompleteInput({
  label,
  icon: Icon,
  value,
  onChange,
  onSelect,
  options,
  placeholder
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useClickOutside(containerRef, () => setIsOpen(false));

  useEffect(() => {
    setHighlightedIndex(0);
  }, [options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Tab':
        if (options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSelect = (option: Airport) => {
    onSelect(option);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (value) {
              onChange(value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          autoComplete="off"
        />
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={option.code}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`px-4 py-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-blue-50' : ''
              } hover:bg-blue-50`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {option.city} ({option.code})
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.name}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {option.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}