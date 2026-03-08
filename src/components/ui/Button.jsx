import React from 'react';

/**
 * Primary button - Clean design
 */
export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon,
  ...props 
}) {
  const baseStyles = 'font-bold transition-all flex items-center justify-center gap-2 rounded-xl';
  
  const variants = {
    primary: 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-[0.98]',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    dark: 'bg-gray-900 hover:bg-gray-800 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6',
    lg: 'py-4 px-8 text-lg',
    full: 'py-4 w-full',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

/**
 * Icon-only button
 */
export function IconButton({ 
  icon: Icon, 
  onClick, 
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  ...props 
}) {
  const variants = {
    ghost: 'bg-gray-50 hover:bg-gray-100 text-gray-500',
    primary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600',
  };

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-4',
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-full transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
