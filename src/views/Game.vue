<template>
  <div class="game-container">
    <div class="game-header">
      <h1 class="game-title">Minesweeper</h1>
      <div class="game-controls">
        <div class="difficulty-selector">
          <label for="difficulty">Difficulty:</label>
          <select id="difficulty" v-model="selectedDifficulty" @change="changeDifficulty">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <button class="new-game-btn" @click="startNewGame">New Game</button>
      </div>
    </div>
    
    <div class="game-info">
      <div class="info-item">
        <span class="info-label">Mines:</span>
        <span class="info-value">{{ gameStore.remainingMines }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Time:</span>
        <span class="info-value">{{ formattedTime }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Status:</span>
        <span class="info-value status" :class="gameStore.gameStatus">{{ gameStatusText }}</span>
      </div>
    </div>
    
    <GameBoard 
      :board="gameStore.board"
      :game-status="gameStore.gameStatus"
      @cell-click="handleCellClick"
      @cell-right-click="handleCellRightClick"
    />
    
    <div v-if="gameStore.gameStatus === 'won'" class="game-message won">
      🎉 Congratulations! You won! 🎉
    </div>
    <div v-if="gameStore.gameStatus === 'lost'" class="game-message lost">
      💥 Game Over! Better luck next time! 💥
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/game'
import GameBoard from '../components/GameBoard.vue'
import { DIFFICULTY_LEVELS, GAME_STATUS } from '../constants/game'
import { createBoard, revealCell, toggleFlag, revealAllMines } from '../utils/gameLogic'

export default {
  name: 'Game',
  components: {
    GameBoard
  },
  setup() {
    const gameStore = useGameStore()
    
    const selectedDifficulty = ref('beginner')
    const gameTimer = ref(null)
    const startTime = ref(null)
    
    const gameStatusText = computed(() => {
      switch (gameStore.gameStatus) {
        case GAME_STATUS.READY:
          return 'Ready'
        case GAME_STATUS.PLAYING:
          return 'Playing'
        case GAME_STATUS.WON:
          return 'Won'
        case GAME_STATUS.LOST:
          return 'Lost'
        default:
          return 'Unknown'
      }
    })
    
    const formattedTime = computed(() => {
      const minutes = Math.floor(gameStore.timeElapsed / 60)
      const seconds = gameStore.timeElapsed % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })
    
    const initializeGame = () => {
      const difficulty = DIFFICULTY_LEVELS[selectedDifficulty.value]
      gameStore.initializeGame(selectedDifficulty.value)
      
      const board = createBoard(difficulty.rows, difficulty.cols, difficulty.mines)
      gameStore.setBoard(board)
      gameStore.setMineCount(difficulty.mines)
      
      clearTimer()
    }
    
    const startNewGame = () => {
      initializeGame()
    }
    
    const changeDifficulty = () => {
      startNewGame()
    }
    
    const handleCellClick = (row, col) => {
      if (gameStore.gameStatus === GAME_STATUS.WON || gameStore.gameStatus === GAME_STATUS.LOST) {
        return
      }
      
      // Start timer on first click
      if (gameStore.gameStatus === GAME_STATUS.READY) {
        startTimer()
        gameStore.setGameStatus(GAME_STATUS.PLAYING)
      }
      
      const difficulty = DIFFICULTY_LEVELS[selectedDifficulty.value]
      const result = revealCell(gameStore.board, row, col, difficulty.rows, difficulty.cols)
      
      if (result.gameOver) {
        clearTimer()
        
        if (result.won) {
          gameStore.setGameStatus(GAME_STATUS.WON)
        } else {
          gameStore.setGameStatus(GAME_STATUS.LOST)
          revealAllMines(gameStore.board, difficulty.rows, difficulty.cols)
        }
      }
    }
    
    const handleCellRightClick = (row, col) => {
      if (gameStore.gameStatus === GAME_STATUS.WON || gameStore.gameStatus === GAME_STATUS.LOST) {
        return
      }
      
      const flagChange = toggleFlag(gameStore.board, row, col)
      gameStore.setFlagCount(gameStore.flagCount + flagChange)
    }
    
    const startTimer = () => {
      startTime.value = Date.now()
      gameTimer.value = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.value) / 1000)
        gameStore.setTimeElapsed(elapsed)
      }, 1000)
    }
    
    const clearTimer = () => {
      if (gameTimer.value) {
        clearInterval(gameTimer.value)
        gameTimer.value = null
      }
    }
    
    onMounted(() => {
      initializeGame()
    })
    
    onUnmounted(() => {
      clearTimer()
    })
    
    return {
      gameStore,
      selectedDifficulty,
      gameStatusText,
      formattedTime,
      startNewGame,
      changeDifficulty,
      handleCellClick,
      handleCellRightClick
    }
  }
}
</script>

<style scoped>
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.game-header {
  text-align: center;
  margin-bottom: 20px;
}

.game-title {
  color: white;
  font-size: 2.5em;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.game-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.difficulty-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.difficulty-selector label {
  font-weight: bold;
}

.difficulty-selector select {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.new-game-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.new-game-btn:hover {
  background: #45a049;
}

.game-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.info-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.info-value {
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
}

.status.ready {
  color: #FFC107;
}

.status.playing {
  color: #4CAF50;
}

.status.won {
  color: #4CAF50;
}

.status.lost {
  color: #F44336;
}

.game-message {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  animation: fadeIn 0.5s ease-in;
}

.game-message.won {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

.game-message.lost {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
  border: 2px solid #F44336;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .game-container {
    padding: 10px;
  }
  
  .game-title {
    font-size: 2em;
  }
  
  .game-controls {
    flex-direction: column;
    gap: 10px;
  }
  
  .game-info {
    gap: 15px;
  }
}
</style>