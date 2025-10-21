import { CELL_TYPES, CELL_STATES } from '../constants/game'

/**
 * Create a new game board
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @param {number} mineCount - Number of mines
 * @returns {Array} 2D array representing the game board
 */
export function createBoard(rows, cols, mineCount) {
  const board = []
  
  // Initialize empty board
  for (let row = 0; row < rows; row++) {
    board[row] = []
    for (let col = 0; col < cols; col++) {
      board[row][col] = {
        type: CELL_TYPES.EMPTY,
        state: CELL_STATES.HIDDEN,
        value: 0,
        row,
        col,
        isMine: false
      }
    }
  }
  
  // Place mines randomly
  placeMines(board, rows, cols, mineCount)
  
  // Calculate numbers for each cell
  calculateNumbers(board, rows, cols)
  
  return board
}

/**
 * Place mines randomly on the board
 * @param {Array} board - Game board
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @param {number} mineCount - Number of mines to place
 */
function placeMines(board, rows, cols, mineCount) {
  let minesPlaced = 0
  
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)
    
    if (!board[row][col].isMine) {
      board[row][col].isMine = true
      board[row][col].type = CELL_TYPES.MINE
      minesPlaced++
    }
  }
}

/**
 * Calculate the number of adjacent mines for each cell
 * @param {Array} board - Game board
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 */
function calculateNumbers(board, rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        const adjacentMines = countAdjacentMines(board, row, col, rows, cols)
        board[row][col].value = adjacentMines
        if (adjacentMines > 0) {
          board[row][col].type = CELL_TYPES.NUMBER
        }
      }
    }
  }
}

/**
 * Count mines adjacent to a cell
 * @param {Array} board - Game board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 * @returns {number} Number of adjacent mines
 */
function countAdjacentMines(board, row, col, rows, cols) {
  let count = 0
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i
      const newCol = col + j
      
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (board[newRow][newCol].isMine) {
          count++
        }
      }
    }
  }
  
  return count
}

/**
 * Reveal a cell and handle game logic
 * @param {Array} board - Game board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 * @returns {Object} Game result
 */
export function revealCell(board, row, col, rows, cols) {
  const cell = board[row][col]
  
  // Don't reveal flagged or already revealed cells
  if (cell.state === CELL_STATES.FLAGGED || cell.state === CELL_STATES.REVEALED) {
    return { gameOver: false, won: false }
  }
  
  // Reveal the cell
  cell.state = CELL_STATES.REVEALED
  
  // Check if it's a mine
  if (cell.isMine) {
    return { gameOver: true, won: false }
  }
  
  // If it's an empty cell, reveal adjacent cells
  if (cell.value === 0) {
    revealAdjacentCells(board, row, col, rows, cols)
  }
  
  // Check if game is won
  if (isGameWon(board, rows, cols)) {
    return { gameOver: true, won: true }
  }
  
  return { gameOver: false, won: false }
}

/**
 * Reveal all adjacent empty cells
 * @param {Array} board - Game board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 */
function revealAdjacentCells(board, row, col, rows, cols) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i
      const newCol = col + j
      
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const cell = board[newRow][newCol]
        
        if (cell.state === CELL_STATES.HIDDEN && !cell.isMine) {
          cell.state = CELL_STATES.REVEALED
          
          // Recursively reveal if it's an empty cell
          if (cell.value === 0) {
            revealAdjacentCells(board, newRow, newCol, rows, cols)
          }
        }
      }
    }
  }
}

/**
 * Toggle flag on a cell
 * @param {Array} board - Game board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {number} Change in flag count (-1, 0, or 1)
 */
export function toggleFlag(board, row, col) {
  const cell = board[row][col]
  
  // Don't flag revealed cells
  if (cell.state === CELL_STATES.REVEALED) {
    return 0
  }
  
  // Toggle flag
  if (cell.state === CELL_STATES.FLAGGED) {
    cell.state = CELL_STATES.HIDDEN
    return -1
  } else {
    cell.state = CELL_STATES.FLAGGED
    return 1
  }
}

/**
 * Check if the game is won
 * @param {Array} board - Game board
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 * @returns {boolean} True if game is won
 */
function isGameWon(board, rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board[row][col]
      
      // If there's a non-mine cell that's not revealed, game is not won
      if (!cell.isMine && cell.state !== CELL_STATES.REVEALED) {
        return false
      }
    }
  }
  
  return true
}

/**
 * Reveal all mines (for game over)
 * @param {Array} board - Game board
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 */
export function revealAllMines(board, rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board[row][col]
      
      if (cell.isMine) {
        cell.state = CELL_STATES.REVEALED
      }
    }
  }
}
