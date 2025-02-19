import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
