import PokeAPI from '../../api/PokeAPI/index'
import { ITEMS_LIMIT } from '../../constants/rules'

export const GAME_ACTION_RECEIVE_DATA = 'GAME_ACTION_RECEIVE_DATA'
export const GAME_ACTION_ERROR_RECEIVE_DATA = 'GAME_ACTION_ERROR_RECEIVE_DATA'
export const GAME_ACTION_SEQUENCY_ADD = 'GAME_ACTION_SEQUENCY_ADD'
export const GAME_ACTION_GAME_OVER = 'GAME_ACTION_GAME_OVER'
export const GAME_ACTION_WIN = 'GAME_ACTION_WIN'
export const GAME_ACTION_RESTART_ERRORS = 'GAME_ACTION_RESTART_ERRORS'
export const GAME_ACTION_SET_LOADING = 'GAME_ACTION_SET_LOADING'

export const fetchItems = () => {
  return dispatch => {
    dispatch(isLoading(true))
    dispatch(restartErrors())

    PokeAPI(ITEMS_LIMIT)
      .then(data => {
        dispatch(receiveDataItems(data))
        dispatch(sequencyAdd())
      })
      .catch(err => dispatch(errorReceiveDataItems(err)))
  }
}

export const receiveDataItems = items => ({
  type: GAME_ACTION_RECEIVE_DATA,
  payload: items
})

export const errorReceiveDataItems = error => ({
  type: GAME_ACTION_ERROR_RECEIVE_DATA,
  payload: error
})

export const restartErrors = () => ({
  type: GAME_ACTION_RESTART_ERRORS
})

export const isLoading = status => ({
  type: GAME_ACTION_SET_LOADING,
  payload: status
})

export const sequencyAdd = () => ({
  type: GAME_ACTION_SEQUENCY_ADD
})

export const gameOver = () => ({
  type: GAME_ACTION_GAME_OVER
})

export const gameWin = () => ({
  type: GAME_ACTION_WIN
})
