import { combineReducers } from 'redux'

import { THEME_CHANGE } from './actions'

function theme (state = {}, action) {
  console.log('reducer------>', state, action)
  switch (action.type) {
    case THEME_CHANGE:
      return action.theme || state
    default: 
      return action.theme || state
  }
}

const myRedux = combineReducers({
  theme
})

export default myRedux
