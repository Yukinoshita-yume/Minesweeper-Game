import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameStatus: 'ready', // ready, playing, won, lost
    difficulty: 'beginner', // beginner, intermediate, expert
    board: [],
    mineCount: 10,
    flagCount: 0,
    timeElapsed: 0,
    gameStartTime: null
  }),
  
  getters: {
    remainingMines: (state) => state.mineCount - state.flagCount,
    isGameOver: (state) => state.gameStatus === 'won' || state.gameStatus === 'lost'
  },
  
  actions: {
    initializeGame(difficulty) {
      this.difficulty = difficulty
      this.gameStatus = 'ready'
      this.flagCount = 0
      this.timeElapsed = 0
      this.gameStartTime = null
    },
    
    setBoard(board) {
      this.board = board
    },
    
    setMineCount(count) {
      this.mineCount = count
    },
    
    setFlagCount(count) {
      this.flagCount = count
    },
    
    setTimeElapsed(time) {
      this.timeElapsed = time
    },
    
    setGameStatus(status) {
      this.gameStatus = status
    }
  }
})
