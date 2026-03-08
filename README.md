# Newcastle Eclectic Golf League

A modern, mobile-first web application for tracking golf eclectic scores at City of Newcastle Golf Club.

## Features

- 🏌️ Track your best scores across 18 holes
- 🏆 Live leaderboard with rankings
- 🔥 "Burn" system for improving hole scores
- 📊 Activity feed to see recent score improvements
- 🔒 Simple PIN-based authentication
- 📱 Responsive mobile design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Project Structure

```
eclectic-golf-league/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles & Tailwind imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Usage

1. **Login**: Select your name and enter any 4-digit PIN
2. **View Leaderboard**: See current standings on the Home tab
3. **Track Scores**: Go to "My Card" to view your best scores
4. **Log Rounds**: Click "Log New Round" to record improvements
5. **Activity Feed**: Check the Feed tab to see recent updates

## Development Notes

This is currently a prototype using mock data. Future versions will include:
- Backend API integration
- Real authentication
- Database persistence
- Admin panel
- Push notifications

## License

MIT
