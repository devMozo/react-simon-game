import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import AppRouter from './routes/AppRouter'

import './index.scss'

const store = createStore(rootReducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
