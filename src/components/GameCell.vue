<template>
  <div 
    class="game-cell"
    :class="cellClasses"
    :style="cellStyle"
    @click="handleClick"
    @contextmenu.prevent="handleRightClick"
  >
    <span v-if="displayValue" class="cell-content">{{ displayValue }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { CELL_TYPES, CELL_STATES, GAME_STATUS } from '../constants/game'

export default {
  name: 'GameCell',
  props: {
    cell: {
      type: Object,
      required: true
    },
    gameStatus: {
      type: String,
      required: true
    }
  },
  emits: ['click', 'right-click'],
  setup(props, { emit }) {
    const cellClasses = computed(() => {
      const classes = ['cell']
      
      // State classes
      if (props.cell.state === CELL_STATES.REVEALED) {
        classes.push('revealed')
      } else if (props.cell.state === CELL_STATES.FLAGGED) {
        classes.push('flagged')
      } else {
        classes.push('hidden')
      }
      
      // Type classes
      if (props.cell.isMine) {
        classes.push('mine')
      } else if (props.cell.value > 0) {
        classes.push('number')
        classes.push(`number-${props.cell.value}`)
      } else {
        classes.push('empty')
      }
      
      // Game over state
      if (props.gameStatus === GAME_STATUS.LOST && props.cell.isMine) {
        classes.push('mine-revealed')
      }
      
      return classes
    })
    
    const cellStyle = computed(() => {
      if (props.cell.state === CELL_STATES.REVEALED && props.cell.value > 0) {
        return {
          color: getNumberColor(props.cell.value)
        }
      }
      return {}
    })
    
    const displayValue = computed(() => {
      if (props.cell.state === CELL_STATES.REVEALED) {
        if (props.cell.isMine) {
          return '💣'
        } else if (props.cell.value > 0) {
          return props.cell.value
        }
      } else if (props.cell.state === CELL_STATES.FLAGGED) {
        return '🚩'
      }
      return ''
    })
    
    const getNumberColor = (value) => {
      const colors = {
        1: '#0000FF', // Blue
        2: '#008000', // Green
        3: '#FF0000', // Red
        4: '#800080', // Purple
        5: '#800000', // Maroon
        6: '#008080', // Teal
        7: '#000000', // Black
        8: '#808080'  // Gray
      }
      return colors[value] || '#000000'
    }
    
    const handleClick = () => {
      emit('click')
    }
    
    const handleRightClick = () => {
      emit('right-click')
    }
    
    return {
      cellClasses,
      cellStyle,
      displayValue,
      handleClick,
      handleRightClick
    }
  }
}
</script>

<style scoped>
.game-cell {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
  border: 1px solid #999;
  background: #c0c0c0;
}

.game-cell:hover {
  background: #d0d0d0;
}

.cell.hidden {
  background: #c0c0c0;
  border-style: outset;
  border-width: 2px;
}

.cell.hidden:hover {
  background: #d0d0d0;
}

.cell.revealed {
  background: #e0e0e0;
  border-style: inset;
  border-width: 1px;
  cursor: default;
}

.cell.revealed:hover {
  background: #e0e0e0;
}

.cell.flagged {
  background: #c0c0c0;
  border-style: outset;
  border-width: 2px;
}

.cell.flagged:hover {
  background: #d0d0d0;
}

.cell.mine {
  background: #ff6b6b;
}

.cell.mine-revealed {
  background: #ff0000;
  animation: mineExplode 0.3s ease-out;
}

.cell.empty {
  background: #e0e0e0;
}

.cell.number {
  background: #e0e0e0;
}

.cell-content {
  display: block;
  line-height: 1;
}

/* Number colors */
.number-1 { color: #0000FF; }
.number-2 { color: #008000; }
.number-3 { color: #FF0000; }
.number-4 { color: #800080; }
.number-5 { color: #800000; }
.number-6 { color: #008080; }
.number-7 { color: #000000; }
.number-8 { color: #808080; }

/* Animations */
@keyframes mineExplode {
  0% {
    transform: scale(1);
    background: #ff6b6b;
  }
  50% {
    transform: scale(1.2);
    background: #ff0000;
  }
  100% {
    transform: scale(1);
    background: #ff0000;
  }
}

/* Responsive design */
@media (max-width: 600px) {
  .game-cell {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
}

@media (max-width: 400px) {
  .game-cell {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
}
</style>
