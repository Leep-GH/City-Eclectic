-- ============================================================
-- ECLECTIC LEAGUE PLAYER SETUP
-- Run this in Supabase SQL Editor to populate your actual players
-- ============================================================

-- STEP 1: Clear old seed data
DELETE FROM activity_feed;
DELETE FROM eclectic_cards;
DELETE FROM profiles;

-- STEP 2: Insert the 8 players
INSERT INTO profiles (name, initials, pin_code, handicap) VALUES
  ('Lee Petrie',       'LP', '3109', 14),
  ('Alf Mawston',      'AM', '7824', 18),
  ('Gavin Maxwell',    'GM', '5641', 12),
  ('Anthony Moody',    'AM', '2356', 16),
  ('Richard Kerr',     'RK', '6917', 10),
  ('Mark Edminson',    'ME', '4482', 15),
  ('Minty Chopra',     'MC', '8159', 8),
  ('Dicky Rutherford', 'DR', '1734', 20);

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
