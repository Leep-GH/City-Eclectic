/**
 * Application-wide constants
 */

// Season rules
export const MAX_ROUNDS_PER_SEASON = 18;
export const MAX_STABLEFORD_POINTS = 5;

// Score thresholds for visual styling
export const SCORE_THRESHOLDS = {
  EAGLE_OR_BETTER: 4, // 4+ points = exceptional (amber highlight)
  BIRDIE: 3,          // 3 points = good (emerald highlight)
  NO_SCORE: 0,        // 0 points = not yet recorded
};

// Tab identifiers
export const TABS = {
  HOME: 'home',
  CARD: 'card',
  FEED: 'feed',
};

// Static Course Data - City of Newcastle Golf Club
export const COURSE_DATA = [
  { hole: 1, name: 'Ministry', par: 4, si: 4 },
  { hole: 2, name: 'The Grange', par: 3, si: 8 },
  { hole: 3, name: 'Westward Ho!', par: 4, si: 14 },
  { hole: 4, name: 'Wagonway', par: 5, si: 16 },
  { hole: 5, name: 'Hawthorns', par: 4, si: 12 },
  { hole: 6, name: 'High Tee', par: 3, si: 6 },
  { hole: 7, name: 'The Chase', par: 4, si: 10 },
  { hole: 8, name: 'Brunton View', par: 5, si: 18 },
  { hole: 9, name: 'Bunker Hill', par: 4, si: 2 },
  { hole: 10, name: 'The Whins', par: 4, si: 5 },
  { hole: 11, name: 'Farthest Point', par: 4, si: 9 },
  { hole: 12, name: 'Ouseburn', par: 3, si: 13 },
  { hole: 13, name: 'Northern Rock', par: 4, si: 3 },
  { hole: 14, name: 'Wee Gem', par: 3, si: 17 },
  { hole: 15, name: 'North Riggs', par: 5, si: 11 },
  { hole: 16, name: 'Vardons Best', par: 4, si: 1 },
  { hole: 17, name: 'Copses', par: 5, si: 15 },
  { hole: 18, name: 'Three Mile', par: 4, si: 7 },
];

// Course summary stats
export const COURSE_STATS = {
  totalHoles: COURSE_DATA.length,
  totalPar: COURSE_DATA.reduce((sum, hole) => sum + hole.par, 0),
};
