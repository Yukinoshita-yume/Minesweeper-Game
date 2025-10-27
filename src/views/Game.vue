<template>
  <div class="game-page">
    <!-- 临时调试区：看到这些数字就说明 store 是活的 -->
    <div class="debug">
      <div>status: {{ store.gameStatus }}</div>
      <div>difficulty: {{ store.difficulty }}</div>
      <div>rows x cols: {{ store.rows }} x {{ store.cols }}</div>
      <div>mines: {{ store.mineCount }}</div>
      <div>board rows: {{ store.board.length }}</div>
    </div>
    <DifficultyToolbar />
    <GreenHUD v-if="store.green?.enabled" />

    <GameBoard
      :board="store.board"
      :game-status="store.gameStatus"
      @cell-click="onCellClick"
      @cell-right-click="onCellRightClick"
    />

    <KnowledgeToast v-if="store.green?.enabled" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import GameBoard from '../components/GameBoard.vue'
import GreenHUD from '../components/GreenHUD.vue'
import KnowledgeToast from '../components/KnowledgeToast.vue'
import DifficultyToolbar from '../components/DifficultyToolbar.vue'

const store = useGameStore()

onMounted(() => {
  // 正常启动一次
  store.initializeGame('beginner')
})

const onCellClick = (r, c) => store.handleCellClick(r, c)
const onCellRightClick = (r, c) => store.handleCellRightClick(r, c)
</script>

<style scoped>
.game-page {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 12px;
}
.debug { 
  font-size: 12px; background: #f7f7f7; border:1px solid #ddd; 
  padding:8px; border-radius:8px; display:flex; gap:12px; flex-wrap:wrap;
}
.debug button { padding:4px 8px; }
</style>
