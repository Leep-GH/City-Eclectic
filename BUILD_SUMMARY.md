# City of Newcastle Eclectic App - Prototype Summary

This document outlines the features, design decisions, and architecture finalized during the initial prototyping phase.

---

## 1. UI/UX & Design Decisions

| Aspect | Details |
|--------|---------|
| **Theme** | "Masters Light Theme" - Crisp whites and slate text, accented with deep Country Club emerald greens and gold/amber highlights |
| **Header** | Custom "City of Newcastle" header featuring a bespoke Golf Flag/Ball emblem |
| **Authentication** | Low-friction 4-digit PIN system. Users select their name from a dropdown and enter a PIN to access their profile (ideal for closed WhatsApp groups) |
| **Data Protection** | "Gentleman's Agreement" frontend security model. Users can view anyone's card from the leaderboard, but the UI locks into "Read-Only" state unless logged in as that specific user |

---

## 2. Core Features Built

| Feature | Description |
|---------|-------------|
| **The Podium** | A visual Top 3 leaderboard prominently displayed on the Home tab |
| **Full Standings** | A drillable list of all players. Tapping a player reveals their exact hole-by-hole scorecard |
| **My Card** | The active user's scorecard. Displays a dynamic motivation banner showing their rank and points needed to catch the leader |
| **Round Logging** | An interactive mode to stage score improvements. Includes a confirmation modal that enforces the 18-round seasonal limit |
| **Blank Rounds** | Ability to log an official round that yielded no score improvements, which still deducts from the 18-round allowance |
| **Activity Feed** | A chronological list of recent "burns" (score improvements) across the league |
| **Rules Modal** | Quick-access overlay outlining the 18-round cap, comp-only rules, and WhatsApp correction procedures |

---

## 3. Database Architecture (Supabase)

The app is designed to run on a **PostgreSQL Supabase** backend. The admin (Creator) will manually populate the initial user list to avoid complex registration flows.

### Table: `profiles`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary Key |
| `name` | text | Player's display name |
| `initials` | varchar | 2-3 character initials for avatar |
| `pin_code` | varchar(4) | For frontend login validation |
| `handicap` | integer | Player's current handicap |
| `avatar_url` | text | Optional profile image URL |

### Table: `eclectic_cards`

| Column | Type | Notes |
|--------|------|-------|
| `user_id` | uuid | Foreign Key → profiles.id |
| `h1` through `h18` | integer | Best Stableford score on each hole (Default: 0) |
| `total_points` | integer | Sum of h1-h18 |
| `rounds_played` | integer | Counter tracking the 18-round limit |

### Table: `activity_feed`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary Key |
| `user_id` | uuid | Foreign Key → profiles.id |
| `hole_number` | integer | Which hole was improved (1-18) |
| `old_score` | integer | Previous best score |
| `new_score` | integer | New best score |
| `created_at` | timestamp | When the burn was recorded |

---

## 4. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Supabase (PostgreSQL) |
| Hosting | TBD (Vercel recommended) |

---

## 5. Course Data (City of Newcastle GC)

```javascript
const COURSE_DATA = [
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
```

---

## 6. Next Steps / TODO

- [ ] Set up Supabase project and create tables
- [ ] Replace mock data with real Supabase queries
- [ ] Implement real PIN authentication
- [ ] Add admin functionality for managing users
- [ ] Deploy to Vercel or similar hosting
- [ ] Set up push notifications for score updates (optional)
- [ ] Add season reset functionality
