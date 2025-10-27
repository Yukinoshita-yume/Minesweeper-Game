// src/stores/game.js
import { defineStore } from 'pinia'
import { DIFFICULTY_LEVELS, CELL_STATES, GAME_STATUS } from '@/constants/game'
import {
  createBoard,
  revealCell as revealCellUtil,
  toggleFlag as toggleFlagUtil,
  revealAllMines
} from '../utils/gameLogic'
import greenConfig from '../modes/greenModeConfig'

export const useGameStore = defineStore('game', {
  state: () => ({
    // 基础游戏状态
    gameStatus: GAME_STATUS.READY,
    difficulty: 'beginner',
    rows: 9,
    cols: 9,
    board: [],
    mineCount: 10,
    flagCount: 0,
    timeElapsed: 0,
    gameStartTime: null,

    // 绿色模式
    green: null // { enabled, budget, trust, toast }
  }),

  getters: {
    remainingMines: (state) => state.mineCount - state.flagCount,
    isGameOver: (state) =>
      state.gameStatus === GAME_STATUS.WON || state.gameStatus === GAME_STATUS.LOST
  },

  actions: {
    // 初始化（读取难度，不再看 URL）
    initializeGame(difficulty = 'beginner') {
      const cfg = DIFFICULTY_LEVELS[difficulty] ?? DIFFICULTY_LEVELS.beginner
      this.difficulty = difficulty
      this.rows = cfg.rows
      this.cols = cfg.cols
      this.mineCount = cfg.mines

      this.board = createBoard(this.rows, this.cols, this.mineCount)
      this.flagCount = 0
      this.gameStatus = GAME_STATUS.READY
      this.timeElapsed = 0
      this.gameStartTime = null

      // ✅ 永远启用绿色模式
      const budget =
        (greenConfig.budgets && greenConfig.budgets[this.difficulty]) ??
        (greenConfig.budgets && greenConfig.budgets.beginner) ??
        0
      this.green = {
        enabled: true,
        budget: Number(budget),
        trust: Number(greenConfig.trustMax ?? 100),
        toast: null
      }
    },

    // 统一扣公信度；返回是否因降为 0 而直接失败
    applyTrustPenalty(penalty = Number(greenConfig.trustPenalty) || 0) {
      if (!this.green?.enabled || penalty <= 0) return false

      const prev = Number(this.green.trust) || 0
      this.green.trust = Math.max(0, prev - penalty)

      // 公信度降为 0：直接判负并揭示地雷
      if (
        this.green.trust === 0 &&
        this.gameStatus !== GAME_STATUS.WON &&
        this.gameStatus !== GAME_STATUS.LOST
      ) {
        this.gameStatus = GAME_STATUS.LOST
        revealAllMines(this.board, this.rows, this.cols)

        // 失败提示（3 秒自动清除）
        this.green.toast = { title: 'Trust exhausted', text: 'Trust is zero. Game over.' }
        setTimeout(() => { if (this.green) this.green.toast = null }, 3000)

        return true
      }
      return false
    },

    // 单击：揭示
    handleCellClick(row, col) {
      if (this.isGameOver) return

      // 切换为 playing
      if (this.gameStatus === GAME_STATUS.READY) {
        this.gameStatus = GAME_STATUS.PLAYING
        this.gameStartTime = Date.now()
      }

      const cell = this.board[row][col]
      // 已揭示/插旗不处理
      if (cell.state === CELL_STATES.REVEALED || cell.state === CELL_STATES.FLAGGED) return

      const result = revealCellUtil(this.board, row, col, this.rows, this.cols)

      if (result.gameOver) {
        if (result.won) {
          this.gameStatus = GAME_STATUS.WON
        } else {
          this.gameStatus = GAME_STATUS.LOST
          // 展示所有地雷
          revealAllMines(this.board, this.rows, this.cols)
        }
      }
    },

    // 右键：插旗/撤旗（含绿色预算逻辑）
    handleCellRightClick(row, col) {
      if (this.isGameOver) return

      const cell = this.board[row][col]
      if (cell.state === CELL_STATES.REVEALED) return

      // 绿色模式：检查预算（仅在从 hidden -> flagged 时）
      const placing = cell.state !== CELL_STATES.FLAGGED
      if (this.green?.enabled && placing) {
        if (Number(this.green.budget) < Number(greenConfig.flagCost || 0)) {
          // 预算不足，不允许插旗
          return
        }
      }

      const delta = toggleFlagUtil(this.board, row, col) // +1 插旗；-1 撤旗
      if (delta !== 0) {
        this.flagCount += delta
      }

      if (this.green?.enabled) {
        if (delta === +1) {
          // 插旗：扣预算
          this.green.budget = Math.max(
            0,
            Number(this.green.budget) - Number(greenConfig.flagCost || 0)
          )

          if (cell.isMine) {
            // 插在地雷上：弹一条轻科普（3 秒）
            const pool = Array.isArray(greenConfig.tips) ? greenConfig.tips : []
            if (pool.length) {
              const tip = pool[Math.floor(Math.random() * pool.length)]
              this.green.toast = tip
              setTimeout(() => { if (this.green) this.green.toast = null }, 3000)
            }
          } else {
            // 插错：扣公信度（降为 0 会直接失败）
            const penalty = Number(greenConfig.trustPenalty) || 0
            const failed = this.applyTrustPenalty(penalty)
            if (!failed) {
              this.green.toast = {
                title: 'Be more careful',
                text: `This is not a mine. Trust -${penalty}.`
              }
              setTimeout(() => { if (this.green) this.green.toast = null }, 3000)
            }
          }
        } else if (delta === -1) {
          // 撤旗：返还少量预算
          this.green.budget = Number(this.green.budget) + Number(greenConfig.unflagRefund || 0)
        }
      }
    }
  }
})
