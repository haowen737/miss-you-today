import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myRedux from './reducers'

import './index.css'
import App from './component/app/App'
import registerServiceWorker from './registerServiceWorker'

import swagger from './utils/swagger'

const store = createStore(myRedux)
// const SwaggerContext = createContext('')

swagger.init()
  .then((res: any) => {
    console.log('res---', res)
  })

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
