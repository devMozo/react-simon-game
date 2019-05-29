import {
  GAME_ACTION_RECEIVE_DATA,
  GAME_ACTION_SEQUENCY_ADD,
  GAME_ACTION_GAME_OVER,
  GAME_ACTION_WIN,
  GAME_ACTION_ERROR_RECEIVE_DATA,
  GAME_ACTION_RESTART_ERRORS,
  GAME_ACTION_SET_LOADING
} from '../../actions/GameAction/index'

const initState = {
  items: [],
  sequency: [],
  win: false,
  done: false,
  loading: false,
  errors: {
    fetch: false
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case GAME_ACTION_RECEIVE_DATA:
      state = {
        ...state,
        loading: false,
        items: action.payload
      }
      break
    case GAME_ACTION_ERROR_RECEIVE_DATA:
      state = {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          fetch: true
        }
      }
      break
    case GAME_ACTION_SEQUENCY_ADD:
      state = {
        ...state,
        sequency: [...state.sequency, action.payload]
      }
      break
    case GAME_ACTION_GAME_OVER:
      state = {
        ...state,
        win: false,
        done: true
      }
      break
    case GAME_ACTION_WIN:
      state = {
        ...state,
        win: true,
        done: true
      }
      break
    case GAME_ACTION_RESTART_ERRORS:
      state = {
        ...state,
        errors: {
          fetch: false
        }
      }
      break
    case GAME_ACTION_SET_LOADING:
      state = {
        ...state,
        loading: action.payload
      }
      break
  }

  return state
}
