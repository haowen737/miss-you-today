import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myRedux from './reducers'

import './index.css'
import App from './component/app/App'
import registerServiceWorker from './registerServiceWorker'

import { Swagger } from '@utils'

// import { SwaggerContext } from '@context'

const store = createStore(myRedux)
// const SwaggerContext = createContext('')

// TODO: use swagger client in front react 
Swagger
  .init()
  .then(() => {
    renderRoot()
  })
  .catch(err => {
    console.log('err----', err)
  })

const renderRoot = () => {
  return (
    ReactDOM.render((
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    ), document.getElementById('root'))
  )
}

process.env.NODE_ENV !== 'development' && registerServiceWorker()
