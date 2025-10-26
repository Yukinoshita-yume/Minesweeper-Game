<!-- src/components/KnowledgeToast.vue -->
<template>
  <transition name="fade">
    <div v-if="toast" class="toast">
      <strong>{{ toast.title }}</strong>
      <p>{{ toast.text }}</p>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
const store = useGameStore()
const toast = computed(() => store.green?.toast)
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: #43a047;
  color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
