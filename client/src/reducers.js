import { combineReducers } from 'redux'

import { THEME_CHANGE, UPDATE_USER } from './actions'

function theme (state = {}, action) {
  switch (action.type) {
    case THEME_CHANGE:
      return action.theme || state
    default: 
      return action.theme || state
  }
}

function user (state = {}, action) {
  let user = window.localStorage.getItem('user')
  user = user ? JSON.parse(user) : null
  switch (action.type) {
    case UPDATE_USER:
      window.localStorage.setItem('user', JSON.stringify(action.user))
      return action.user
      break
    default:
      return user || state.user || {}
      break
  }
}

const myRedux = combineReducers({
  theme,
  user
})

export default myRedux
