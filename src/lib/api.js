/**
 * Supabase API service layer
 * 
 * All database operations for the Eclectic app.
 * PIN validation happens here — we never send PINs to the frontend in bulk.
 */

import { supabase } from './supabase';
import { COURSE_DATA } from '../constants';

// ============================================================
// AUTH / PROFILES
// ============================================================

/**
 * Fetch all players (for the login dropdown and leaderboard).
 * Deliberately excludes pin_code from the response.
 */
export async function fetchPlayers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, initials, handicap')
    .order('name');

  if (error) throw error;
  return data;
}

/**
 * Validate a player's PIN. Returns true/false.
 * We query for the specific user + pin combo so the PIN is never exposed.
 */
export async function validatePin(userId, pin) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .eq('pin_code', pin)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// ============================================================
// LEADERBOARD
// ============================================================

/**
 * Fetch the ranked leaderboard from the database view.
 */
export async function fetchLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('rank');

  if (error) throw error;
  return data;
}

// ============================================================
// ECLECTIC CARDS (SCORES)
// ============================================================

/**
 * Convert a card row (h1..h18, total_points, rounds_played) into the 
 * app's scores object format: { 1: score, 2: score, ... 18: score }
 */
function cardRowToScores(row) {
  const scores = {};
  for (let i = 1; i <= 18; i++) {
    scores[i] = row[`h${i}`] ?? 0;
  }
  return scores;
}

/**
 * Fetch a single player's eclectic card.
 * Returns { scores: {1: n, ...}, totalPoints: n, roundsPlayed: n }
 */
export async function fetchPlayerCard(userId) {
  const { data, error } = await supabase
    .from('eclectic_cards')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  return {
    scores: cardRowToScores(data),
    totalPoints: data.total_points,
    roundsPlayed: data.rounds_played,
  };
}

/**
 * Submit a round: apply staged burns and increment rounds_played.
 * Also inserts activity_feed entries for each improvement.
 * 
 * @param {string} userId - The player's UUID
 * @param {Object} stagedBurns - { holeNumber: { oldScore, newScore }, ... }
 * @param {Object} currentScores - Current best scores { 1: n, 2: n, ... }
 * @param {number} currentRoundsPlayed - Current rounds_played count
 */
export async function submitRound(userId, stagedBurns, currentScores, currentRoundsPlayed) {
  const burnEntries = Object.entries(stagedBurns);

  // Build the update object for eclectic_cards
  const newScores = { ...currentScores };
  const cardUpdate = {};

  for (const [holeStr, data] of burnEntries) {
    const holeNum = parseInt(holeStr);
    newScores[holeNum] = data.newScore;
    cardUpdate[`h${holeNum}`] = data.newScore;
  }

  // Recalculate total
  const newTotal = Object.values(newScores).reduce((sum, pts) => sum + pts, 0);
  cardUpdate.total_points = newTotal;
  cardUpdate.rounds_played = currentRoundsPlayed + 1;

  // Update the eclectic card
  const { error: cardError } = await supabase
    .from('eclectic_cards')
    .update(cardUpdate)
    .eq('user_id', userId);

  if (cardError) throw cardError;

  // Insert activity feed entries for each burn (skip if blank round)
  if (burnEntries.length > 0) {
    const feedRows = burnEntries.map(([holeStr, data]) => ({
      user_id: userId,
      hole_number: parseInt(holeStr),
      old_score: data.oldScore,
      new_score: data.newScore,
    }));

    const { error: feedError } = await supabase
      .from('activity_feed')
      .insert(feedRows);

    if (feedError) throw feedError;
  }

  return { newScores, newTotal, newRoundsPlayed: currentRoundsPlayed + 1 };
}

// ============================================================
// ACTIVITY FEED
// ============================================================

/**
 * Fetch recent activity feed entries, joined with player names.
 * Returns the most recent 50 entries.
 */
export async function fetchActivityFeed() {
  const { data, error } = await supabase
    .from('activity_feed')
    .select(`
      id,
      hole_number,
      old_score,
      new_score,
      created_at,
      profiles!inner ( name )
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;

  // Transform into the format the ActivityFeed component expects
  return data.map((entry) => {
    const holeData = COURSE_DATA.find(h => h.hole === entry.hole_number);
    const createdAt = new Date(entry.created_at);
    
    return {
      id: entry.id,
      userId: entry.user_id,
      user: entry.profiles.name,
      hole: entry.hole_number,
      holeName: holeData?.name || `Hole ${entry.hole_number}`,
      oldPts: entry.old_score,
      newPts: entry.new_score,
      createdAt,
      time: formatTimeAgo(createdAt),
    };
  });
}

/**
 * Format a date into a relative time string (e.g. "2m ago", "1h ago", "3d ago")
 */
function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
