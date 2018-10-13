import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { observable} from "mobx"
import { Provider as MProvider } from "mobx-react"

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myRedux from './reducers'

import './index.css'
import App from './component/app/App'
import registerServiceWorker from './registerServiceWorker'

import { Swagger } from '@utils'

interface RootProps {
  apis: any
}

const store = createStore(myRedux)
const root = document.getElementById('root')

const renderRoot = ({ apis }: RootProps) => {
  console.log('apis-----', apis)
  return (
    ReactDOM.render((
      <Provider store={store}>
        <MProvider $api={observable(apis)}>
          <HashRouter>
            <App />
          </HashRouter>
        </MProvider>
      </Provider>
    ), root)
  )
}

const renderSwaggerFail = () => {
  return ReactDOM.render(<p>swagger init failed</p>, root)
}

Swagger
  .init()
  .then((apis) => {
    renderRoot({ apis })
  })
  .catch(renderSwaggerFail)

process.env.NODE_ENV !== 'development' && registerServiceWorker()
