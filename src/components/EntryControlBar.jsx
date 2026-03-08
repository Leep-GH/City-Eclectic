import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { pluralize } from '../utils';

/**
 * Floating control bar shown during round entry mode
 */
export function EntryControlBar({ 
  stagedBurnsCount, 
  onCancel, 
  onSubmit 
}) {
  const hasBurns = stagedBurnsCount > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="max-w-md mx-auto flex gap-3">
        {/* Cancel button */}
        <button 
          onClick={onCancel}
          className="flex items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
          aria-label="Cancel round entry"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Submit button */}
        <button 
          onClick={onSubmit}
          disabled={!hasBurns}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all ${
            hasBurns 
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          {hasBurns 
            ? `Review ${stagedBurnsCount} ${pluralize(stagedBurnsCount, 'Burn')}` 
            : 'Select holes to improve'
          }
        </button>
      </div>
    </div>
  );
}
