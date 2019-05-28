const GAME_ACTION_START = 'GAME_ACTION_START'
const GAME_ACTION_SEQUENCY_ADD = 'GAME_ACTION_SEQUENCY_ADD'
const GAME_ACTION_GAME_OVER = 'GAME_ACTION_GAME_OVER'
const GAME_ACTION_WIN = 'GAME_ACTION_WIN'

export const start = initObject => ({
  type: GAME_ACTION_START,
  payload: initObject
})

export const sequencyAdd = item => ({
  type: GAME_ACTION_SEQUENCY_ADD,
  payload: item
})

export const gameOver = () => ({
  type: GAME_ACTION_GAME_OVER
})

export const gameWin = () => ({
  type: GAME_ACTION_WIN
})
