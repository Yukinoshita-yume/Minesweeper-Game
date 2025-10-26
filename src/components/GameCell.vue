<template>
  <div
    class="game-cell"
    :class="cellClasses"
    :style="cellStyle"
    @click="onClick"
    @contextmenu.prevent="onRightClick"
  >
    <span v-if="displayValue" class="cell-content">{{ displayValue }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { CELL_STATES } from '../constants/game' // 使用你已有的常量
import greenConfig from '../modes/greenModeConfig' // 绿色数字配色

export default {
  name: 'GameCell',
  props: {
    cell: { type: Object, required: true },
    gameStatus: { type: String, required: true }
  },
  emits: ['click', 'right-click'],
  setup(props, { emit }) {
    const onClick = () => emit('click')
    const onRightClick = () => emit('right-click')

    const cellClasses = computed(() => {
      const classes = []
      if (props.cell.state === CELL_STATES.REVEALED) classes.push('revealed')
      else if (props.cell.state === CELL_STATES.FLAGGED) classes.push('flagged')
      else classes.push('hidden')

      if (props.cell.state === CELL_STATES.REVEALED) {
        if (props.cell.isMine) classes.push('mine')
        else if (props.cell.value > 0) classes.push(`number-${props.cell.value}`)
        else classes.push('empty')
      }
      return classes
    })

    const displayValue = computed(() => {
      if (props.cell.state === CELL_STATES.REVEALED) {
        if (props.cell.isMine) return '💣'
        if (props.cell.value > 0) return props.cell.value
        return ''
      }
      if (props.cell.state === CELL_STATES.FLAGGED) return '🚩'
      return ''
    })

    const cellStyle = computed(() => {
      // 绿色主题：为数字着色
      if (props.cell.state === CELL_STATES.REVEALED && !props.cell.isMine && props.cell.value > 0) {
        const col = greenConfig.theme?.numberColors?.[props.cell.value]
        return col ? { color: col } : {}
      }
      return {}
    })

    return { onClick, onRightClick, cellClasses, displayValue, cellStyle }
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
  background: #c0c0c0;
  border: 1px solid #777;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
}
.game-cell.hidden:hover { filter: brightness(0.95); }
.game-cell.revealed { background: #e0e0e0; }
.game-cell.flagged { background: #dfefff; }
.game-cell.mine { background: #ffd6d6; }

/* 数字颜色（非绿色模式下也提供基础可见性） */
.number-1 { color: #1976d2; }
.number-2 { color: #388e3c; }
.number-3 { color: #d32f2f; }
.number-4 { color: #7b1fa2; }
.number-5 { color: #5d4037; }
.number-6 { color: #00897b; }
.number-7 { color: #455a64; }
.number-8 { color: #616161; }
</style>
