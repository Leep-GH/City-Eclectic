import React from 'react';
import { X } from 'lucide-react';

/**
 * Reusable modal component - Clean minimal design
 */
export function Modal({ isOpen, onClose, children, zIndex = 70 }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/30 backdrop-blur-sm"
      style={{ zIndex }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[90vh] sm:max-h-[85vh] shadow-xl overflow-hidden animate-slide-up sm:animate-fade-in flex flex-col">
        {children}
      </div>
    </div>
  );
}

/**
 * Modal header with title and close button
 */
export function ModalHeader({ title, icon: Icon, onClose, className = 'bg-gray-50' }) {
  return (
    <div className={`p-5 border-b border-gray-100 ${className} flex justify-between items-center flex-shrink-0`}>
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-emerald-600" />}
        {title}
      </h3>
      {onClose && (
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors touch-target"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

/**
 * Modal body with scrollable content
 */
export function ModalBody({ children, className = '' }) {
  return (
    <div className={`p-5 max-h-[60vh] overflow-y-auto scroll-smooth flex-1 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Modal footer for actions
 */
export function ModalFooter({ children }) {
  return (
    <div className="p-5 border-t border-gray-100 bg-white flex-shrink-0" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
      {children}
    </div>
  );
}
