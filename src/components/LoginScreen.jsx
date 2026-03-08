import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { NewcastleCrest } from './NewcastleCrest';

// Golf ball background
const GOLF_BALL_URL = 'https://images.unsplash.com/photo-1529386068791-7f91e71e7fc5?auto=format&fit=crop&w=800&q=80';

/**
 * Login screen component - Clean minimal design with golf ball background
 */
export function LoginScreen({ 
  players, 
  selectedUser, 
  onSelectUser, 
  pin, 
  onPinChange,
  onLogin,
  loginError = ''
}) {
  const [isPinFocused, setIsPinFocused] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handlePinInput = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    onPinChange(val);
  };

  const selectedPlayer = players.find(p => p.id === selectedUser);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Golf ball background decoration */}
      <div 
        className="absolute top-0 right-0 w-[80%] h-[60%] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${GOLF_BALL_URL})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right top',
          transform: 'rotate(-15deg) translate(10%, -10%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-6">
        {/* Header area with avatar placeholder */}
        <div className="flex justify-end py-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
            {selectedPlayer ? (
              <span className="text-sm font-bold text-emerald-800">{selectedPlayer.initials}</span>
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>

        {/* Welcome section */}
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="mb-8 animate-slide-up">
            <NewcastleCrest size={64} color="#1a472a" className="mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-1">City of Newcastle</h1>
            <p className="text-lg text-emerald-600 font-semibold">Eclectic League</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6 animate-slide-up delay-100">
            {/* Player Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Player
              </label>
              <div className="relative">
                <select 
                  value={selectedUser}
                  onChange={(e) => onSelectUser(e.target.value)}
                  className="w-full input-mint appearance-none pr-12 cursor-pointer"
                >
                  <option value="" disabled>Choose your name...</option>
                  {players.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-emerald-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* PIN Input */}
            <div className={`transition-all duration-300 ${selectedUser ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter PIN
              </label>
              {/* Clickable PIN display that focuses the hidden input */}
              <div 
                onClick={() => document.getElementById('pin-input')?.focus()}
                className={`flex gap-3 justify-center cursor-pointer p-2 rounded-2xl transition-all ${
                  isPinFocused ? 'bg-emerald-50 ring-2 ring-emerald-400' : ''
                }`}
              >
                {[0, 1, 2, 3].map((index) => {
                  const isCurrent = isPinFocused && pin.length === index;
                  const isFilled = pin[index];
                  
                  return (
                    <div 
                      key={index}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold transition-all ${
                        isFilled 
                          ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300' 
                          : isCurrent
                          ? 'bg-white border-2 border-emerald-500 ring-2 ring-emerald-300'
                          : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {isFilled ? '•' : isCurrent ? <span className="animate-pulse text-emerald-400">|</span> : ''}
                    </div>
                  );
                })}
              </div>
              {/* Actual input - positioned off-screen but still functional */}
              <input 
                type="tel"
                inputMode="numeric"
                autoComplete="off"
                value={pin}
                onChange={handlePinInput}
                onFocus={() => setIsPinFocused(true)}
                onBlur={() => setIsPinFocused(false)}
                disabled={!selectedUser}
                id="pin-input"
                className="opacity-0 absolute -left-[9999px]"
                maxLength={4}
              />
              <p className="mt-3 text-center text-sm text-gray-500">
                {loginError 
                  ? <span className="text-red-500 font-medium">{loginError}</span>
                  : isPinFocused ? 'Enter 4 digits' : 'Tap boxes above to enter PIN'
                }
              </p>
            </div>

            {/* Sign In Button */}
            <button 
              onClick={async () => {
                setIsLoggingIn(true);
                await onLogin();
                setIsLoggingIn(false);
              }}
              disabled={pin.length !== 4 || isLoggingIn}
              className={`w-full btn-primary transition-all ${
                pin.length === 4 && !isLoggingIn
                  ? 'opacity-100' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center animate-fade-in delay-300">
            <p className="text-sm text-gray-400">
              Season 2026 • 18 Rounds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
