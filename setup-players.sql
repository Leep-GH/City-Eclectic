-- ============================================================
-- ECLECTIC LEAGUE PLAYER SETUP
-- Run this in Supabase SQL Editor to populate your actual players
-- ============================================================

-- STEP 1: Clear old seed data
DELETE FROM activity_feed;
DELETE FROM eclectic_cards;
DELETE FROM profiles;

-- STEP 2: Insert the 13 players
INSERT INTO profiles (name, initials, pin_code) VALUES
  ('Lee Petrie',       'LP', '3109'),
  ('Alf Mawston',      'AM', '7824'),
  ('Gavin Maxwell',    'GM', '5641'),
  ('Anthony Moody',    'AM', '2356'),
  ('Richard Kerr',     'RK', '6917'),
  ('Mark Edminson',    'ME', '4482'),
  ('Minty Chopra',     'MC', '8159'),
  ('Dicky Rutherford', 'DR', '1734'),
  ('Andy Thompson',    'AT', '4728'),
  ('Cam Thompson',     'CT', '9053'),
  ('Michael Keen',     'MK', '6315'),
  ('David Urwin',      'DU', '2847'),
  ('Darren Naylor',    'DN', '5196');

-- STEP 3: Create blank eclectic cards for each player
INSERT INTO eclectic_cards (user_id)
SELECT id FROM profiles;

-- Done! All players are set up with these PINs:
-- Lee Petrie: 3109
-- Alf Mawston: 7824
-- Gavin Maxwell: 5641
-- Anthony Moody: 2356
-- Richard Kerr: 6917
-- Mark Edminson: 4482
-- Minty Chopra: 8159
-- Dicky Rutherford: 1734
-- Andy Thompson: 4728
-- Cam Thompson: 9053
-- Michael Keen: 6315
-- David Urwin: 2847
-- Darren Naylor: 5196

-- ============================================================
-- ADD NEW PLAYERS ONLY (run this against an existing DB)
-- Use this instead of the full script above to avoid wiping data
-- ============================================================
INSERT INTO profiles (name, initials, pin_code) VALUES
  ('Andy Thompson', 'AT', '4728'),
  ('Cam Thompson',  'CT', '9053'),
  ('Michael Keen',  'MK', '6315'),
  ('David Urwin',   'DI', '2847'),
  ('Darren Naylor', 'DN', '5196');

INSERT INTO eclectic_cards (user_id)
SELECT id FROM profiles
WHERE name IN ('Andy Thompson', 'Cam Thompson', 'Michael Keen', 'David Urwin', 'Darren Naylor')
  AND id NOT IN (SELECT user_id FROM eclectic_cards);
