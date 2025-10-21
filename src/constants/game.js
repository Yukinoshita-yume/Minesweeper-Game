// Game difficulty configurations
export const DIFFICULTY_LEVELS = {
  beginner: {
    name: 'Beginner',
    rows: 9,
    cols: 9,
    mines: 10
  },
  intermediate: {
    name: 'Intermediate',
    rows: 16,
    cols: 16,
    mines: 40
  },
  expert: {
    name: 'Expert',
    rows: 16,
    cols: 30,
    mines: 99
  }
}

// Cell types
export const CELL_TYPES = {
  EMPTY: 'empty',
  NUMBER: 'number',
  MINE: 'mine',
  FLAG: 'flag',
  REVEALED: 'revealed'
}

// Game status
export const GAME_STATUS = {
  READY: 'ready',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost'
}

// Cell states
export const CELL_STATES = {
  HIDDEN: 'hidden',
  REVEALED: 'revealed',
  FLAGGED: 'flagged'
}
