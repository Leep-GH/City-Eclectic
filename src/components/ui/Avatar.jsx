import React from 'react';

/**
 * Avatar component showing initials in a circle
 */
export function Avatar({ 
  initials, 
  size = 'md', 
  variant = 'default',
  className = '' 
}) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-xl',
    xl: 'w-16 h-16 text-lg',
  };

  const variants = {
    default: 'bg-gray-100 text-gray-600 border-2 border-gray-200',
    primary: 'bg-white text-emerald-800 border-2 border-emerald-300',
    gold: 'bg-emerald-100 text-emerald-800 border-3 border-emerald-300',
    silver: 'bg-gray-100 text-gray-600 border-2 border-gray-200',
    bronze: 'bg-orange-50 text-orange-700 border-2 border-orange-200',
  };

  return (
    <div 
      className={`rounded-full flex items-center justify-center font-bold ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {initials}
    </div>
  );
}

/**
 * Rank badge showing position number
 */
export function RankBadge({ rank, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
  };

  const variant = rank === 1 
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
    : rank === 2
    ? 'bg-gray-100 text-gray-600 border border-gray-200'
    : rank === 3
    ? 'bg-orange-100 text-orange-600 border border-orange-200'
    : 'bg-gray-50 text-gray-500 border border-gray-100';

  return (
    <div className={`rounded-full flex items-center justify-center font-bold ${sizes[size]} ${variant}`}>
      {rank}
    </div>
  );
}
