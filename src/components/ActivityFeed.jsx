import React from 'react';
import { Flame, TrendingUp, Clock, Zap } from 'lucide-react';
import { SCORE_THRESHOLDS } from '../constants';

/**
 * Activity feed item showing a score improvement - Clean card design
 */
function FeedItem({ burn, index }) {
  const isExceptional = burn.newPts >= SCORE_THRESHOLDS.EAGLE_OR_BETTER;
  const pointsGained = burn.newPts - burn.oldPts;
  
  return (
    <div 
      className="card p-4 flex gap-4 items-start animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className={`rounded-xl p-3 flex items-center justify-center flex-shrink-0 ${
        isExceptional 
          ? 'bg-amber-100' 
          : 'bg-emerald-100'
      }`}>
        <Flame className={`w-5 h-5 ${isExceptional ? "text-amber-600" : "text-emerald-600"}`} />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{burn.user}</span>
          {' improved '}
          <span className="font-semibold text-gray-900">
            Hole {burn.hole}
          </span>
          <span className="text-gray-400"> ({burn.holeName})</span>
        </div>
        
        <div className="flex items-center gap-3 mt-2">
          {/* Time badge */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {burn.time}
          </div>
          
          {/* Points gained badge */}
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isExceptional 
              ? 'bg-amber-100 text-amber-700' 
              : 'bg-emerald-100 text-emerald-700'
          }`}>
            <TrendingUp className="w-3 h-3" />
            +{pointsGained} pts
          </div>
        </div>
        
        {/* Score change display */}
        <div className="mt-3 inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
          <span className="text-gray-400 line-through text-xs">{burn.oldPts}</span>
          <Zap className={`w-4 h-4 ${isExceptional ? 'text-amber-400' : 'text-emerald-400'}`} />
          <span className={`text-lg font-bold ${isExceptional ? "text-amber-500" : "text-emerald-600"}`}>
            {burn.newPts}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Activity feed showing recent score improvements
 */
export function ActivityFeed({ burns }) {
  if (burns.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Flame className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-600 font-semibold text-lg">No activity yet</p>
        <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
          Score improvements from all players will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Flame className="w-4 h-4 text-emerald-600" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recent Burns</h3>
      </div>
      {burns.map((burn, index) => (
        <FeedItem key={burn.id} burn={burn} index={index} />
      ))}
    </div>
  );
}
