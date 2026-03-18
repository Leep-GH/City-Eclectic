import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  LoginScreen, 
  AppHeader, 
  BottomNav, 
  EntryControlBar,
  Leaderboard,
  Scorecard,
  ActivityFeed,
  RulesModal,
  ConfirmModal,
} from './components';
import { TABS } from './constants';
import { calculateTotalPoints } from './utils';
import { 
  fetchPlayers, 
  validatePin, 
  fetchLeaderboard, 
  fetchPlayerCard, 
  fetchActivityFeed, 
  submitRound 
} from './lib/api';

/**
 * Main Application Component
 * 
 * Manages application state and orchestrates child components.
 * Business logic is kept here, presentation is delegated to components.
 */
export default function App() {
  // ============================================================
  // AUTH STATE
  // ============================================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // ============================================================
  // DATA STATE (loaded from Supabase)
  // ============================================================
  const [players, setPlayers] = useState([]);       // Login dropdown
  const [leaderboard, setLeaderboard] = useState([]); // Ranked standings
  const [feedItems, setFeedItems] = useState([]);    // Activity feed
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================
  // APP STATE
  // ============================================================
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const [bestScores, setBestScores] = useState({});
  const [roundsLogged, setRoundsLogged] = useState(0);

  // ============================================================
  // ENTRY MODE STATE
  // ============================================================
  const [isEnteringRound, setIsEnteringRound] = useState(false);
  const [stagedBurns, setStagedBurns] = useState({});
  const [expandedHole, setExpandedHole] = useState(null);

  // ============================================================
  // UI STATE
  // ============================================================
  const [viewingPlayer, setViewingPlayer] = useState(null);
  const [viewingPlayerScores, setViewingPlayerScores] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // INITIAL DATA LOAD + AUTO-LOGIN
  // ============================================================
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [playersData, leaderboardData, feedData] = await Promise.all([
          fetchPlayers(),
          fetchLeaderboard(),
          fetchActivityFeed(),
        ]);
        setPlayers(playersData);
        setLeaderboard(leaderboardData);
        setFeedItems(feedData);

        // Auto-login if user was previously authenticated on this device
        const savedUserId = localStorage.getItem('eclectic_user_id');
        if (savedUserId) {
          try {
            const card = await fetchPlayerCard(savedUserId);
            setSelectedUserId(savedUserId);
            setBestScores(card.scores);
            setRoundsLogged(card.roundsPlayed);
            setIsAuthenticated(true);
          } catch (err) {
            // Saved user no longer valid, clear storage
            localStorage.removeItem('eclectic_user_id');
            console.error('Auto-login failed, cleared saved session:', err);
          }
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // ============================================================
  // DERIVED STATE (memoized for performance)
  // ============================================================
  const activeUser = useMemo(() => 
    leaderboard.find(u => u.id === selectedUserId) || leaderboard[0],
    [selectedUserId, leaderboard]
  );

  const leader = leaderboard[0];
  const pointsToLeader = leader && activeUser ? leader.points - activeUser.points : 0;
  const totalPoints = useMemo(() => calculateTotalPoints(bestScores), [bestScores]);
  const stagedBurnsCount = Object.keys(stagedBurns).length;

  // ============================================================
  // AUTH HANDLERS
  // ============================================================
  const handleSelectUser = useCallback((userId) => {
    setSelectedUserId(userId);
    setPin('');
    setLoginError('');
  }, []);

  const handlePinChange = useCallback((newPin) => {
    setPin(newPin);
    setLoginError('');
  }, []);

  const handleLogin = useCallback(async () => {
    if (pin.length !== 4 || !selectedUserId) return;
    
    try {
      setLoginError('');
      const valid = await validatePin(selectedUserId, pin);
      if (valid) {
        // Load this player's eclectic card
        const card = await fetchPlayerCard(selectedUserId);
        setBestScores(card.scores);
        setRoundsLogged(card.roundsPlayed);
        setIsAuthenticated(true);
        // Persist login on this device
        localStorage.setItem('eclectic_user_id', selectedUserId);
      } else {
        setLoginError('Incorrect PIN. Try again.');
        setPin('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Something went wrong. Try again.');
    }
  }, [pin, selectedUserId]);

  // ============================================================
  // ROUND ENTRY HANDLERS
  // ============================================================
  const handleStartEntry = useCallback(() => {
    setIsEnteringRound(true);
    setStagedBurns({});
    setExpandedHole(null);
  }, []);

  const handleCancelEntry = useCallback(() => {
    setIsEnteringRound(false);
    setStagedBurns({});
    setExpandedHole(null);
  }, []);

  const handleToggleExpand = useCallback((holeNumber) => {
    setExpandedHole(prev => prev === holeNumber ? null : holeNumber);
  }, []);

  const handleStageBurn = useCallback((hole, points) => {
    if (points <= bestScores[hole]) return;
    setStagedBurns(prev => ({
      ...prev,
      [hole]: { oldScore: bestScores[hole], newScore: points }
    }));
    setExpandedHole(null);
  }, [bestScores]);

  const handleClearStaged = useCallback((hole) => {
    setStagedBurns(prev => {
      const next = { ...prev };
      delete next[hole];
      return next;
    });
  }, []);

  const handleInitiateSubmit = useCallback(() => {
    if (Object.keys(stagedBurns).length === 0) return;
    setShowConfirmModal(true);
  }, [stagedBurns]);

  const handleConfirmSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const result = await submitRound(selectedUserId, stagedBurns, bestScores, roundsLogged);
      
      // Update local state with results
      setBestScores(result.newScores);
      setRoundsLogged(result.newRoundsPlayed);
      setStagedBurns({});
      setShowConfirmModal(false);
      setIsEnteringRound(false);

      // Refresh leaderboard and feed in background
      const [newLeaderboard, newFeed] = await Promise.all([
        fetchLeaderboard(),
        fetchActivityFeed(),
      ]);
      setLeaderboard(newLeaderboard);
      setFeedItems(newFeed);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit round. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [bestScores, stagedBurns, selectedUserId, roundsLogged]);

  // ============================================================
  // NAVIGATION HANDLERS
  // ============================================================
  const handleTabChange = useCallback(async (tab) => {
    setActiveTab(tab);
    setViewingPlayer(null);
    setViewingPlayerScores(null);
    
    // Refresh data when switching tabs
    try {
      if (tab === TABS.HOME) {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } else if (tab === TABS.FEED) {
        const data = await fetchActivityFeed();
        setFeedItems(data);
      }
    } catch (err) {
      console.error('Failed to refresh tab data:', err);
    }
  }, []);

  const handleSelectPlayer = useCallback(async (player) => {
    setViewingPlayer(player);
    try {
      const card = await fetchPlayerCard(player.id);
      setViewingPlayerScores(card.scores);
    } catch (err) {
      console.error('Failed to load player card:', err);
      setViewingPlayerScores(null);
    }
  }, []);

  const handleBackFromPlayer = useCallback(() => {
    setViewingPlayer(null);
    setViewingPlayerScores(null);
  }, []);

  // ============================================================
  // RENDER: LOADING STATE
  // ============================================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: LOGIN SCREEN
  // ============================================================
  if (!isAuthenticated) {
    return (
      <LoginScreen
        players={players}
        selectedUser={selectedUserId}
        onSelectUser={handleSelectUser}
        pin={pin}
        onPinChange={handlePinChange}
        onLogin={handleLogin}
        loginError={loginError}
      />
    );
  }

  // ============================================================
  // RENDER: MAIN APP
  // ============================================================
  const showHeaderStats = activeTab === TABS.CARD && !viewingPlayer && !isEnteringRound;

  return (
    <div className="h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <AppHeader
        onShowRules={() => setShowRulesModal(true)}
        onGoHome={() => handleTabChange(TABS.HOME)}
        showStats={showHeaderStats}
        totalPoints={totalPoints}
        roundsLogged={roundsLogged}
        userName={activeUser?.name || ''}
        userInitials={activeUser?.initials || ''}
      />

      {/* Main Content - scrollable area */}
      <main className="flex-1 overflow-y-auto overscroll-contain">
        <div className={`max-w-md mx-auto p-4 mt-2 ${isEnteringRound ? 'pb-28' : 'pb-4'}`}>
        {/* HOME TAB */}
        {activeTab === TABS.HOME && (
          viewingPlayer ? (
            viewingPlayerScores ? (
              <Scorecard
                scores={viewingPlayerScores}
                isReadOnly={true}
                viewingPlayer={viewingPlayer}
                onBack={handleBackFromPlayer}
              />
            ) : (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
              </div>
            )
          ) : (
            <Leaderboard
              players={leaderboard}
              onSelectPlayer={handleSelectPlayer}
            />
          )
        )}

        {/* CARD TAB */}
        {activeTab === TABS.CARD && (
          <Scorecard
            scores={bestScores}
            stagedBurns={stagedBurns}
            expandedHole={expandedHole}
            isEntryMode={isEnteringRound}
            isReadOnly={false}
            activeUser={activeUser}
            pointsToLeader={pointsToLeader}
            onStartEntry={handleStartEntry}
            onToggleExpand={handleToggleExpand}
            onStageBurn={handleStageBurn}
            onClearStaged={handleClearStaged}
          />
        )}

        {/* FEED TAB */}
        {activeTab === TABS.FEED && (
          <ActivityFeed burns={feedItems} />
        )}
        </div>
      </main>

      {/* Modals */}
      <RulesModal 
        isOpen={showRulesModal} 
        onClose={() => setShowRulesModal(false)} 
      />
      
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        stagedBurns={stagedBurns}
        roundsLogged={roundsLogged}
      />

      {/* Bottom Controls */}
      {isEnteringRound ? (
        <EntryControlBar
          stagedBurnsCount={stagedBurnsCount}
          onCancel={handleCancelEntry}
          onSubmit={handleInitiateSubmit}
        />
      ) : (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      )}
    </div>
  );
}
