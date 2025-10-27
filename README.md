# Environmental Cleanup Game

An environmentally-friendly garbage removal game built with Vue 3 and modern web technologies. Unlike the classic minesweeper, this game transforms mines into environmental hazards that players must identify and mark. The game integrates environmental protection concepts with educational content about sustainable development and green technologies.

## Features

- **Environmental Theme**: Mines transformed into environmental hazards that need to be identified
- **Three Difficulty Levels**: Beginner (9×9, 10 hazards), Intermediate (16×16, 40 hazards), Expert (16×30, 99 hazards)
- **Green Mode**: Environmental cleanup simulation with budget management and trust system
- **Educational Content**: Integrated knowledge tips about sustainable technologies and environmental solutions
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Game Statistics**: Real-time hazard counter, timer, budget, and trust indicators
- **Right-click Flagging**: Mark suspected hazards with environmental remediation flags
- **Auto-reveal**: Automatically reveals safe areas
- **State Management**: Uses Pinia for modern reactive state management

## Game Rules

1. **Objective**: Identify and mark all environmental hazards
2. **Left Click**: Reveal a cell to check for hazards
3. **Right Click**: Place environmental remediation flag (costs budget)
4. **Numbers**: Display the number of hazards adjacent to this cell
5. **Empty Cells**: Automatically reveal all connected safe areas
6. **Winning**: Reveal all non-hazard cells
7. **Losing**: Click on a hazard or exhaust your trust

## Green Mode Features

- **Budget System**: Each flag placement costs environmental cleanup budget
- **Trust System**: Incorrect flagging reduces public trust; zero trust ends the game
- **Educational Tips**: Learn about sustainable technologies when correctly identifying hazards
- **Refund System**: Removing flags returns partial budget
- **Difficulty-based Budgets**: Different starting budgets for each difficulty level

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/              # Vue components
│   ├── DifficultyToolbar.vue # Difficulty selection and game controls
│   ├── GameBoard.vue        # Main game board component
│   ├── GameCell.vue         # Individual cell component
│   ├── GreenHUD.vue         # Green mode HUD display
│   └── KnowledgeToast.vue   # Educational tip notifications
├── views/                   # Page components
│   └── Game.vue            # Main game view
├── stores/                  # Pinia stores
│   └── game.js             # Game state management
├── router/                  # Vue Router configuration
│   └── index.js            # Route definitions
├── utils/                   # Utility functions
│   └── gameLogic.js        # Core game logic implementation
├── constants/               # Game constants
│   └── game.js             # Game configuration and constants
├── modes/                   # Game mode configurations
│   └── greenModeConfig.js  # Green mode settings and educational content
├── App.vue                  # Root component
└── main.js                  # Application entry point
```

## Technologies Used

- **Vue.js 3.5**: Modern reactive frontend framework with Composition API
- **Pinia**: Modern state management for Vue 3
- **Vue Router 4**: Client-side routing
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with gradients and animations
- **ES6+**: Modern JavaScript features

## Development

The project uses Vite for fast development and building with the following scripts:

- `npm run dev`: Start development server with hot reload (runs on port 8080)
- `npm run build`: Build for production
- `npm run preview`: Preview the production build locally

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
