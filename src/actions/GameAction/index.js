import PokeAPI from '../../api/PokeAPI'
import BreweryAPI from '../../api/BreweryAPI'
import BasketballAPI from '../../api/BasketballAPI'
import RickAndMortyAPI from '../../api/RickAndMortyAPI'
import { ITEMS_LIMIT } from '../../constants/rules'

export const GAME_ACTION_RECEIVE_DATA = 'GAME_ACTION_RECEIVE_DATA'
export const GAME_ACTION_ERROR_RECEIVE_DATA = 'GAME_ACTION_ERROR_RECEIVE_DATA'
export const GAME_ACTION_ADD_TO_SEQUENCY = 'GAME_ACTION_ADD_TO_SEQUENCY'
export const GAME_ACTION_GAME_OVER = 'GAME_ACTION_GAME_OVER'
export const GAME_ACTION_WIN = 'GAME_ACTION_WIN'
export const GAME_ACTION_RESTART_ERRORS = 'GAME_ACTION_RESTART_ERRORS'
export const GAME_ACTION_SET_LOADING = 'GAME_ACTION_SET_LOADING'

export const fetchItems = () => {
  return dispatch => {
    dispatch(isLoading(true))
    dispatch(restartErrors())

    Promise.all([
      PokeAPI(ITEMS_LIMIT),
      BreweryAPI(),
      BasketballAPI(),
      RickAndMortyAPI()
    ])
      .then(([pokeArray, breweryArray, basketballArray, rickAndMortyArray]) => {
        const result = [
          ...pokeArray,
          ...breweryArray,
          ...basketballArray,
          ...rickAndMortyArray
        ]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)

        dispatch(receiveDataItems(result))
        dispatch(addToSequency())
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

export const addToSequency = () => ({
  type: GAME_ACTION_ADD_TO_SEQUENCY
})

export const gameOver = () => ({
  type: GAME_ACTION_GAME_OVER
})

export const gameWin = () => ({
  type: GAME_ACTION_WIN
})
