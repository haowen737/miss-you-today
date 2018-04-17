import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myRedux from './reducers'

import './index.css'
import App from './component/app/App'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(myRedux)

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'))
registerServiceWorker()
