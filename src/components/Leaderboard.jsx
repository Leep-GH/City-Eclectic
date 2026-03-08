import React from 'react';
import { Medal, ChevronRight, Crown } from 'lucide-react';
import { Avatar, RankBadge } from './ui';
import { MAX_ROUNDS_PER_SEASON } from '../constants';

/**
 * Top 3 podium display - Clean minimal design
 */
export function Podium({ players }) {
  if (players.length < 3) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500">Not enough players for podium</p>
      </div>
    );
  }

  const [first, second, third] = players;

  return (
    <div className="card p-6 text-center">
      <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-8">
        Season Leaders
      </h3>
      
      <div className="flex justify-center items-end gap-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center w-1/3 animate-slide-up delay-100">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600 border-2 border-gray-200">
              {second.initials}
            </div>
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-black text-white">2</span>
          </div>
          <p className="text-sm font-semibold text-gray-700 mt-2">{second.name?.split(' ')[0]}</p>
          <div className="bg-gray-100 w-full h-16 rounded-t-xl flex flex-col items-center justify-center mt-3">
            <span className="text-xl font-black text-gray-700">{second.points}</span>
            <span className="text-[10px] text-gray-500 font-semibold">pts</span>
          </div>
        </div>

        {/* 1st Place - Elevated */}
        <div className="flex flex-col items-center w-1/3 z-10 -mt-4 animate-slide-up">
          <Crown className="w-7 h-7 text-amber-500 mb-2" />
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-xl font-bold text-emerald-800 border-3 border-emerald-300">
              {first.initials}
            </div>
            <span className="absolute -top-1 -right-1 w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-black text-white">1</span>
          </div>
          <p className="text-sm font-bold text-gray-900 mt-2">{first.name?.split(' ')[0]}</p>
          <div className="bg-emerald-600 w-full h-24 rounded-t-xl flex flex-col items-center justify-center mt-3">
            <span className="text-3xl font-black text-white">{first.points}</span>
            <span className="text-xs text-emerald-200 font-semibold">pts</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center w-1/3 animate-slide-up delay-200">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-lg font-bold text-orange-700 border-2 border-orange-200">
              {third.initials}
            </div>
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-xs font-black text-white">3</span>
          </div>
          <p className="text-sm font-semibold text-gray-700 mt-2">{third.name?.split(' ')[0]}</p>
          <div className="bg-orange-100 w-full h-12 rounded-t-xl flex flex-col items-center justify-center mt-3">
            <span className="text-lg font-black text-orange-700">{third.points}</span>
            <span className="text-[10px] text-orange-500 font-semibold">pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Full standings list - Clean card design
 */
export function StandingsList({ players, onSelectPlayer }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
          <Medal className="w-4 h-4 text-emerald-600" />
          Full Standings
        </h3>
        <span className="text-xs text-gray-400">Tap to view</span>
      </div>
      <div className="divide-y divide-gray-50">
        {players.map((player, index) => (
          <div 
            key={player.id}
            onClick={() => onSelectPlayer(player)}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectPlayer(player)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                player.rank === 1 ? 'bg-emerald-100 text-emerald-700' :
                player.rank === 2 ? 'bg-gray-100 text-gray-600' :
                player.rank === 3 ? 'bg-orange-100 text-orange-600' :
                'bg-gray-50 text-gray-500'
              }`}>
                {player.rank}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{player.name}</div>
                <div className="text-xs text-gray-400">
                  {player.rounds}/{MAX_ROUNDS_PER_SEASON} Rounds
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-bold ${
                  player.rank === 1 ? 'text-emerald-600' : 
                  player.rank === 2 ? 'text-gray-600' :
                  player.rank === 3 ? 'text-orange-500' :
                  'text-gray-700'
                }`}>
                  {player.points}
                </span>
                <span className="text-xs text-gray-400">pts</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Combined leaderboard view with podium and standings
 */
export function Leaderboard({ players, onSelectPlayer }) {
  return (
    <div className="flex flex-col gap-6">
      <Podium players={players} />
      <StandingsList players={players} onSelectPlayer={onSelectPlayer} />
    </div>
  );
}
