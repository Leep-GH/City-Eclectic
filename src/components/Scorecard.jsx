import React from 'react';
import { Flame, ChevronLeft, Plus, Activity, TrendingUp, Target, Trophy } from 'lucide-react';
import { COURSE_DATA, SCORE_THRESHOLDS, MAX_STABLEFORD_POINTS } from '../constants';
import { getOrdinalSuffix, formatScore } from '../utils';

/**
 * Header shown when viewing another player's card (read-only)
 */
function ViewingHeader({ player, onBack }) {
  return (
    <div className="flex items-center gap-3 card p-4">
      <button 
        onClick={onBack} 
        className="p-3 bg-gray-100 rounded-full text-gray-500 active:bg-gray-200 transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div>
        <h2 className="text-gray-900 font-bold text-lg">{player.name}'s Card</h2>
        <p className="text-sm text-gray-500">
          Total Points: <span className="text-emerald-600 font-bold">{player.points}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Profile banner shown on user's own card - Clean design
 */
function ProfileBanner({ user, pointsToLeader }) {
  return (
    <div className="card p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg border-2 border-emerald-200">
          {user.initials}
        </div>
        <div>
          <h2 className="text-gray-900 font-bold text-lg">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-emerald-600 font-semibold">{getOrdinalSuffix(user.rank)} Place</span>
            <span className="text-gray-300">·</span>
            <span className="font-semibold text-gray-700">{user.points} pts</span>
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1 justify-end">
          <Target className="w-3 h-3" /> Target
        </div>
        <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          {pointsToLeader === 0 ? (
            <><Trophy className="w-4 h-4 text-amber-500" /> Leader</>
          ) : `+${pointsToLeader} pts`}
        </div>
      </div>
    </div>
  );
}

/**
 * Header shown during round entry mode
 */
function EntryModeHeader() {
  return (
    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex items-center justify-between">
      <div>
        <h2 className="text-emerald-800 font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" /> Logging Round
        </h2>
        <p className="text-xs text-emerald-600 mt-1">
          Tap a hole to enter your <span className="font-bold">Stableford points</span> (not the hole score).
        </p>
      </div>
    </div>
  );
}

/**
 * Single hole row in the scorecard
 */
function HoleRow({ 
  holeData, 
  currentBest, 
  staged, 
  isExpanded, 
  isEntryMode,
  onToggleExpand,
  onStageBurn,
  onClearStaged
}) {
  const displayScore = staged ? staged.newScore : currentBest;
  
  // Determine colors
  let scoreColor = "text-gray-700";
  let rowBg = "bg-white";
  let badgeColor = "bg-gray-100 text-gray-600";
  
  if (staged) {
    const isExceptional = staged.newScore >= SCORE_THRESHOLDS.EAGLE_OR_BETTER;
    rowBg = isExceptional ? "bg-amber-50" : "bg-emerald-50";
    scoreColor = isExceptional ? "text-amber-500" : "text-emerald-600";
    badgeColor = isExceptional ? "bg-amber-200 text-amber-800" : "bg-emerald-200 text-emerald-800";
  } else if (displayScore >= SCORE_THRESHOLDS.EAGLE_OR_BETTER) {
    scoreColor = "text-amber-500";
  } else if (displayScore === SCORE_THRESHOLDS.BIRDIE) {
    scoreColor = "text-emerald-600";
  } else if (displayScore === SCORE_THRESHOLDS.NO_SCORE) {
    scoreColor = "text-gray-300";
  }

  return (
    <div className="transition-colors">
      <div 
        onClick={() => isEntryMode && onToggleExpand(holeData.hole)}
        className={`grid grid-cols-12 gap-2 p-3 items-center ${isEntryMode ? 'cursor-pointer hover:bg-gray-50' : ''} ${rowBg}`}
        role={isEntryMode ? "button" : undefined}
        tabIndex={isEntryMode ? 0 : undefined}
        onKeyDown={(e) => isEntryMode && e.key === 'Enter' && onToggleExpand(holeData.hole)}
      >
        {/* Hole info */}
        <div className="col-span-6 flex items-center gap-3 pl-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${badgeColor}`}>
            {holeData.hole}
          </div>
          <div className="font-semibold text-gray-800 truncate">{holeData.name}</div>
        </div>
        
        {/* Par/SI */}
        <div className="col-span-3 text-center text-xs text-gray-400">
          {holeData.par} <span className="text-gray-300 px-0.5">|</span> {holeData.si}
        </div>
        
        {/* Score */}
        <div className="col-span-3 flex justify-center items-center gap-1.5 pr-1">
          {staged && <Flame className="w-4 h-4 text-orange-500" />}
          <span className={`text-xl font-bold ${scoreColor}`}>
            {formatScore(displayScore)}
          </span>
        </div>
      </div>

      {/* Expanded score picker */}
      {isExpanded && isEntryMode && (
        <div className="bg-gray-50 p-5 border-t border-gray-100">
          <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Stableford Points
          </p>
          <div className="flex justify-center gap-2 max-w-xs mx-auto">
            {Array.from({ length: MAX_STABLEFORD_POINTS + 1 }, (_, pts) => {
              const isCurrent = pts === currentBest;
              const isLower = pts < currentBest;
              const isSelected = staged && staged.newScore === pts;
              const isExceptional = pts >= SCORE_THRESHOLDS.EAGLE_OR_BETTER;
              
              let btnClass = "w-11 h-11 rounded-full font-bold text-lg flex items-center justify-center transition-all ";
              
              if (isSelected) {
                btnClass += isExceptional 
                  ? "bg-amber-500 text-white" 
                  : "bg-emerald-600 text-white";
              } else if (isCurrent) {
                btnClass += "bg-white text-emerald-600 border-2 border-emerald-500";
              } else if (isLower) {
                btnClass += "bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed";
              } else {
                btnClass += "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200";
              }

              return (
                <button 
                  key={pts} 
                  disabled={isLower || isCurrent} 
                  onClick={() => onStageBurn(holeData.hole, pts)} 
                  className={btnClass}
                  aria-label={`${pts} points`}
                >
                  {pts}
                </button>
              );
            })}
          </div>
          
          {staged && (
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => onClearStaged(holeData.hole)} 
                className="text-sm font-bold text-red-500 hover:text-red-600 bg-red-50 px-4 py-1.5 rounded-full transition-colors"
              >
                Cancel Burn
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Full scorecard component
 */
export function Scorecard({
  scores,
  stagedBurns = {},
  expandedHole = null,
  isEntryMode = false,
  isReadOnly = false,
  viewingPlayer = null,
  activeUser = null,
  pointsToLeader = 0,
  onBack,
  onStartEntry,
  onToggleExpand,
  onStageBurn,
  onClearStaged,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Context-aware header */}
      {isReadOnly && viewingPlayer && (
        <ViewingHeader player={viewingPlayer} onBack={onBack} />
      )}
      
      {!isReadOnly && !isEntryMode && activeUser && (
        <ProfileBanner user={activeUser} pointsToLeader={pointsToLeader} />
      )}
      
      {isEntryMode && <EntryModeHeader />}

      {/* Primary CTA - Log New Round */}
      {!isReadOnly && !isEntryMode && (
        <button 
          onClick={onStartEntry}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Log New Round
        </button>
      )}

      {/* Scorecard grid */}
      <div className={`card overflow-hidden ${
        isEntryMode ? 'border-2 border-emerald-300' : ''
      }`}>
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
          <div className="col-span-6 flex items-center pl-2">Hole</div>
          <div className="col-span-3 text-center">Par/SI</div>
          <div className="col-span-3 text-center pr-2">Best Pts</div>
        </div>

        {/* Holes */}
        <div className="divide-y divide-gray-100">
          {COURSE_DATA.map((holeData) => (
            <HoleRow
              key={holeData.hole}
              holeData={holeData}
              currentBest={scores[holeData.hole]}
              staged={isEntryMode ? stagedBurns[holeData.hole] : null}
              isExpanded={expandedHole === holeData.hole}
              isEntryMode={isEntryMode}
              onToggleExpand={onToggleExpand}
              onStageBurn={onStageBurn}
              onClearStaged={onClearStaged}
            />
          ))}
        </div>

        {/* Totals row */}
        <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 border-t border-gray-200 items-center">
          <div className="col-span-6 pl-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</div>
          <div className="col-span-3" />
          <div className="col-span-3 flex justify-center pr-1">
            <span className="text-xl font-black text-emerald-700">
              {Object.values(scores).reduce((sum, s) => sum + (s || 0), 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
