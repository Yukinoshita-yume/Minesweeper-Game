<!-- src/components/GreenHUD.vue -->
<template>
  <div class="hud">
    <span>🌱 Budget: {{ budget }}</span>
    <span>🤝 Trust: {{ trust }}</span>
    <span>🚩 Flags left: {{ flagsLeft }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
const store = useGameStore()
const budget = computed(() => store.green?.budget ?? 0)
const trust = computed(() => store.green?.trust ?? 0)
const flagsLeft = computed(() => store.remainingMines)
</script>

<style scoped>
.hud {
  background: linear-gradient(90deg, #2e7d32, #66bb6a);
  color: #fff;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
</style>
