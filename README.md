# Minesweeper Game

A modern Vue.js implementation of the classic Minesweeper game.

## Features

- **Three Difficulty Levels**: Beginner (9x9, 10 mines), Intermediate (16x16, 40 mines), Expert (16x30, 99 mines)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Game Statistics**: Real-time mine counter and timer
- **Right-click Flagging**: Mark suspected mines with flags
- **Auto-reveal**: Automatically reveals empty areas
- **Game State Management**: Uses Vuex for state management

## Game Rules

1. **Objective**: Clear all non-mine cells without clicking on any mines
2. **Left Click**: Reveal a cell
3. **Right Click**: Toggle flag on a cell
4. **Numbers**: Show how many mines are adjacent to that cell
5. **Empty Cells**: Automatically reveal all connected empty cells
6. **Winning**: Reveal all non-mine cells
7. **Losing**: Click on a mine

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── GameBoard.vue   # Main game board component
│   └── GameCell.vue    # Individual cell component
├── views/              # Page components
│   └── Game.vue        # Main game view
├── store/              # Vuex store
│   └── index.js        # State management
├── utils/              # Utility functions
│   └── gameLogic.js    # Game logic implementation
├── constants/          # Game constants
│   └── game.js         # Game configuration
└── main.js             # Application entry point
```

## Technologies Used

- **Vue.js 2.6**: Frontend framework
- **Vuex**: State management
- **Vue Router**: Routing
- **Webpack**: Module bundler
- **SCSS**: Styling
- **ES6+**: Modern JavaScript

## Development

The project uses a standard Vue.js webpack template with the following scripts:

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run start`: Alias for dev command

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
