/**
 * Mock data for prototype development
 * This will be replaced with Supabase queries in production
 */

// Initial scores for the logged-in user (for demo purposes)
export const MOCK_USER_SCORES = {
  1: 2, 2: 1, 3: 0, 4: 3, 5: 2, 6: 2, 7: 1, 8: 3, 9: 0,
  10: 2, 11: 1, 12: 2, 13: 1, 14: 0, 15: 3, 16: 1, 17: 2, 18: 2
};

// Leaderboard players
export const MOCK_PLAYERS = [
  { id: 'u1', name: 'Lee P.', points: 42, rounds: 12, initials: 'LP', hcp: 14 },
  { id: 'u2', name: 'John S.', points: 38, rounds: 14, initials: 'JS', hcp: 11 },
  { id: 'u3', name: 'Dave M.', points: 35, rounds: 10, initials: 'DM', hcp: 18 },
  { id: 'u4', name: 'Chris W.', points: 31, rounds: 16, initials: 'CW', hcp: 8 },
  { id: 'u5', name: 'Mark T.', points: 28, rounds: 8, initials: 'MT', hcp: 22 },
];

// Generate ranked leaderboard (sorted by points desc)
export const MOCK_LEADERBOARD = MOCK_PLAYERS
  .sort((a, b) => b.points - a.points)
  .map((player, index) => ({
    ...player,
    rank: index + 1,
  }));

// Recent activity feed
export const MOCK_FEED = [
  { 
    id: 1, 
    userId: 'u1',
    user: 'Lee P.', 
    hole: 10, 
    holeName: 'The Whins', 
    oldPts: 1, 
    newPts: 3, 
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
    time: '2m ago' 
  },
  { 
    id: 2, 
    userId: 'u2',
    user: 'John S.', 
    hole: 4, 
    holeName: 'Wagonway', 
    oldPts: 2, 
    newPts: 4, 
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    time: '1h ago' 
  },
  { 
    id: 3, 
    userId: 'u3',
    user: 'Dave M.', 
    hole: 18, 
    holeName: 'Three Mile', 
    oldPts: 0, 
    newPts: 2, 
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    time: '3h ago' 
  },
];

/**
 * Simulates fetching a player's full scorecard
 * In production, this would query Supabase
 */
export function getMockPlayerScores(playerId) {
  // For demo, return the same scores for everyone
  // In production, each player would have their own scores
  return { ...MOCK_USER_SCORES };
}
