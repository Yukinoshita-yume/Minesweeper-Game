<template>
  <div class="game-board" :style="boardStyle">
    <!-- 如果列数为 0，显示一个提示，便于排查 -->
    <div v-if="cols === 0" class="empty-tip">No columns — board[0] is empty.</div>

    <!-- 使用 display: contents 让每一行直接把单元格放进 grid -->
    <template v-for="(row, r) in board" :key="`row-${r}`">
      <GameCell
        v-for="(cell, c) in row"
        :key="`cell-${r}-${c}`"
        :cell="cell"
        :game-status="gameStatus"
        @click="() => emitCellClick(r, c)"
        @right-click="() => emitCellRightClick(r, c)"
      />
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import GameCell from './GameCell.vue'

const CELL_SIZE = 30 // 固定每格 30px，确保可见

export default {
  name: 'GameBoard',
  components: { GameCell },
  props: {
    board: { type: Array, required: true },
    gameStatus: { type: String, required: true }
  },
  emits: ['cell-click', 'cell-right-click'],
  setup(props, { emit }) {
    const cols = computed(() => (props.board?.[0]?.length) || 0)
    const boardStyle = computed(() => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${cols.value}, ${CELL_SIZE}px)`,
      gridAutoRows: `${CELL_SIZE}px`,
      gap: '1px',
      background: '#999',
      border: '2px solid #666',
      borderRadius: '6px',
      padding: '2px',
      width: 'fit-content',
      maxWidth: '100%'
    }))

    const emitCellClick = (r, c) => emit('cell-click', r, c)
    const emitCellRightClick = (r, c) => emit('cell-right-click', r, c)

    return { cols, boardStyle, emitCellClick, emitCellRightClick }
  }
}
</script>

<style scoped>
.empty-tip {
  padding: 8px 12px;
  background: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  border-radius: 6px;
}
</style>
