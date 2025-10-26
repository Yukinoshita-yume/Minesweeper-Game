<template>
  <div class="toolbar">
    <label>
      Difficulty:
      <select v-model="selected" @change="applyPreset">
        <option value="beginner">Beginner (9×9, 10)</option>
        <option value="intermediate">Intermediate (16×16, 40)</option>
        <option value="expert">Expert (16×30, 99)</option>
      </select>
    </label>

    <button @click="restart">Start over</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/game'

const store = useGameStore()
const selected = ref('beginner')
const rows = ref(9)
const cols = ref(9)
const mines = ref(10)

const applyPreset = () => {
  if (selected.value !== 'custom') {
    store.initializeGame(selected.value) // 使用预设难度
  }
}


const restart = () => {
  if (selected.value === 'custom') applyCustom()
  else store.initializeGame(selected.value)
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 10px;
  background: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.toolbar label { display: inline-flex; gap: 6px; align-items: center; }
.toolbar input, .toolbar select { padding: 4px 6px; }
</style>
