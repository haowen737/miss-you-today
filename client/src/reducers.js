import { combineReducers } from 'redux'

import { THEME_CHANGE, CHECK_USER } from './actions'

function theme (state = {}, action) {
  switch (action.type) {
    case THEME_CHANGE:
      return action.theme || state
    default: 
      return action.theme || state
  }
}

function user (state = {}, action) {
  const user = window.localStorage.getItem('user')
  console.log(user)
  switch (action.type) {
    case CHECK_USER:
      return action.user || state
    default:
      return action.user || state
  }
}

const myRedux = combineReducers({
  theme
})

export default myRedux
