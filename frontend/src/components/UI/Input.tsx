import React from 'react';

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`space-y-1 w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          block w-full px-3 py-2 rounded-lg shadow-sm transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          border text-sm sm:text-base
        `}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
