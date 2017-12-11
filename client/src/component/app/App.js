import React, { Component } from 'react'
import Greet from './../greet/jGreet'
import Blog from './../blog/Blog';
import MusicPlayer from './../../widgets/musicPlayer/MusicPlayer';

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

class App extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <div className="app">
        <div className="page">
          <Switch>
            <Route path="/blog" exact component={Blog} />
            <Route path="/" exact component={Greet} />
          </Switch>
        </div>
        <MusicPlayer theme={{}}></MusicPlayer>
      </div>
    )
  }
}

const theme = (state) => (
  {
    getTheme: () => state
  }
)

export default App
// export default connect()(App)
