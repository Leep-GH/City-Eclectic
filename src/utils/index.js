/**
 * Utility functions for the Eclectic app
 */

import { SCORE_THRESHOLDS } from '../constants';

/**
 * Returns the ordinal suffix for a number (1st, 2nd, 3rd, 4th, etc.)
 * @param {number} n - The number to get suffix for
 * @returns {string} The number with ordinal suffix
 */
export function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Calculates total points from a scores object
 * @param {Object} scores - Object with hole numbers as keys and points as values
 * @returns {number} Total points
 */
export function calculateTotalPoints(scores) {
  return Object.values(scores).reduce((sum, pts) => sum + pts, 0);
}

/**
 * Gets the appropriate color class for a score value
 * @param {number} score - The score value
 * @param {boolean} isStaged - Whether this is a staged (pending) score
 * @returns {{textColor: string, bgColor: string}} Color classes
 */
export function getScoreColors(score, isStaged = false) {
  if (score >= SCORE_THRESHOLDS.EAGLE_OR_BETTER) {
    return {
      textColor: 'text-amber-500',
      bgColor: isStaged ? 'bg-amber-50' : 'bg-white',
      badgeColor: 'bg-amber-200 text-amber-800',
    };
  }
  if (score === SCORE_THRESHOLDS.BIRDIE) {
    return {
      textColor: 'text-emerald-600',
      bgColor: isStaged ? 'bg-emerald-50' : 'bg-white',
      badgeColor: 'bg-emerald-200 text-emerald-800',
    };
  }
  if (score === SCORE_THRESHOLDS.NO_SCORE) {
    return {
      textColor: 'text-slate-300',
      bgColor: 'bg-white',
      badgeColor: 'bg-slate-100 text-slate-600',
    };
  }
  return {
    textColor: 'text-slate-700',
    bgColor: 'bg-white',
    badgeColor: 'bg-slate-100 text-slate-600',
  };
}

/**
 * Formats a score for display (shows dash for zero)
 * @param {number} score - The score value
 * @returns {string} Formatted score
 */
export function formatScore(score) {
  return score === 0 ? '-' : String(score);
}

/**
 * Generates initials from a full name
 * @param {string} name - Full name
 * @returns {string} Initials (2 characters)
 */
export function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Validates a 4-digit PIN
 * @param {string} pin - The PIN to validate
 * @returns {boolean} Whether the PIN is valid format
 */
export function isValidPinFormat(pin) {
  return /^\d{4}$/.test(pin);
}

/**
 * Pluralizes a word based on count
 * @param {number} count - The count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (defaults to singular + 's')
 * @returns {string} Pluralized word
 */
export function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}
