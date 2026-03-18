-- ============================================================
-- City of Newcastle Eclectic League — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. PROFILES TABLE
-- Stores player info. Admin creates these manually.
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  initials VARCHAR(3) NOT NULL,
  pin_code VARCHAR(4) NOT NULL,
  handicap INTEGER NOT NULL DEFAULT 18,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. ECLECTIC CARDS TABLE
-- One row per player: their best Stableford score on each hole.
CREATE TABLE IF NOT EXISTS eclectic_cards (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  h1  INTEGER NOT NULL DEFAULT 0,
  h2  INTEGER NOT NULL DEFAULT 0,
  h3  INTEGER NOT NULL DEFAULT 0,
  h4  INTEGER NOT NULL DEFAULT 0,
  h5  INTEGER NOT NULL DEFAULT 0,
  h6  INTEGER NOT NULL DEFAULT 0,
  h7  INTEGER NOT NULL DEFAULT 0,
  h8  INTEGER NOT NULL DEFAULT 0,
  h9  INTEGER NOT NULL DEFAULT 0,
  h10 INTEGER NOT NULL DEFAULT 0,
  h11 INTEGER NOT NULL DEFAULT 0,
  h12 INTEGER NOT NULL DEFAULT 0,
  h13 INTEGER NOT NULL DEFAULT 0,
  h14 INTEGER NOT NULL DEFAULT 0,
  h15 INTEGER NOT NULL DEFAULT 0,
  h16 INTEGER NOT NULL DEFAULT 0,
  h17 INTEGER NOT NULL DEFAULT 0,
  h18 INTEGER NOT NULL DEFAULT 0,
  total_points INTEGER NOT NULL DEFAULT 0,
  rounds_played INTEGER NOT NULL DEFAULT 0
);

-- 3. ACTIVITY FEED TABLE
-- Logs every score improvement ("burn").
CREATE TABLE IF NOT EXISTS activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hole_number INTEGER NOT NULL CHECK (hole_number BETWEEN 1 AND 18),
  old_score INTEGER NOT NULL DEFAULT 0,
  new_score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast feed queries (newest first)
CREATE INDEX IF NOT EXISTS idx_activity_feed_created 
  ON activity_feed(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE eclectic_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

-- PROFILES: Anyone can read names/initials/handicaps. 
-- PIN is intentionally excluded from the select policy via the service layer.
CREATE POLICY "Anyone can read profiles"
  ON profiles FOR SELECT
  USING (true);

-- ECLECTIC CARDS: Anyone can read all cards (leaderboard is public).
CREATE POLICY "Anyone can read eclectic cards"
  ON eclectic_cards FOR SELECT
  USING (true);

-- ECLECTIC CARDS: Anyone can update cards (PIN validation is done in the app).
-- In a production app you'd use auth, but for this trust-based league this is fine.
CREATE POLICY "Anyone can update eclectic cards"
  ON eclectic_cards FOR UPDATE
  USING (true);

-- ACTIVITY FEED: Anyone can read the feed.
CREATE POLICY "Anyone can read activity feed"
  ON activity_feed FOR SELECT
  USING (true);

-- ACTIVITY FEED: Anyone can insert into the feed.
CREATE POLICY "Anyone can insert activity feed"
  ON activity_feed FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- HELPER VIEW: Leaderboard (ranked by total_points DESC)
-- ============================================================
CREATE OR REPLACE VIEW leaderboard
  WITH (security_invoker = true)
AS
SELECT 
  p.id,
  p.name,
  p.initials,
  p.handicap AS hcp,
  ec.total_points AS points,
  ec.rounds_played AS rounds,
  RANK() OVER (ORDER BY ec.total_points DESC, p.name ASC) AS rank
FROM profiles p
JOIN eclectic_cards ec ON ec.user_id = p.id
ORDER BY ec.total_points DESC, p.name ASC;

-- ============================================================
-- SEED DATA (Your 5 initial players — change PINs as needed!)
-- ============================================================
INSERT INTO profiles (id, name, initials, pin_code, handicap) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Lee P.',   'LP', '1234', 14),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'John S.',  'JS', '5678', 11),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Dave M.',  'DM', '9012', 18),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Chris W.', 'CW', '3456', 8),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Mark T.',  'MT', '7890', 22)
ON CONFLICT (id) DO NOTHING;

-- Create blank eclectic cards for each player
INSERT INTO eclectic_cards (user_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001'),
  ('a1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0003-4000-8000-000000000003'),
  ('a1b2c3d4-0004-4000-8000-000000000004'),
  ('a1b2c3d4-0005-4000-8000-000000000005')
ON CONFLICT (user_id) DO NOTHING;
