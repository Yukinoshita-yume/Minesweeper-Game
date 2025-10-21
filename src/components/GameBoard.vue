<template>
  <div class="game-board" :style="boardStyle">
    <div 
      v-for="(row, rowIndex) in board" 
      :key="rowIndex" 
      class="board-row"
    >
      <GameCell
        v-for="(cell, colIndex) in row"
        :key="`${rowIndex}-${colIndex}`"
        :cell="cell"
        :game-status="gameStatus"
        @click="handleCellClick(rowIndex, colIndex)"
        @right-click="handleCellRightClick(rowIndex, colIndex)"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import GameCell from './GameCell.vue'

export default {
  name: 'GameBoard',
  components: {
    GameCell
  },
  props: {
    board: {
      type: Array,
      required: true
    },
    gameStatus: {
      type: String,
      required: true
    }
  },
  emits: ['cell-click', 'cell-right-click'],
  setup(props, { emit }) {
    const boardStyle = computed(() => {
      const cols = props.board[0] ? props.board[0].length : 0
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      }
    })
    
    const handleCellClick = (row, col) => {
      emit('cell-click', row, col)
    }
    
    const handleCellRightClick = (row, col) => {
      emit('cell-right-click', row, col)
    }
    
    return {
      boardStyle,
      handleCellClick,
      handleCellRightClick
    }
  }
}
</script>

<style scoped>
.game-board {
  display: grid;
  gap: 1px;
  background: #999;
  border: 2px solid #666;
  border-radius: 4px;
  padding: 2px;
  margin: 0 auto;
  max-width: 100%;
  overflow: auto;
}

.board-row {
  display: contents;
}

@media (max-width: 600px) {
  .game-board {
    max-width: 100vw;
    overflow-x: auto;
  }
}
</style>
