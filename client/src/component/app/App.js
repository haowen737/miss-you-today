import React, { Component } from 'react'
import Greet from './../greet/Greet'
import Blog from './../blog/Blog'
import Me from './../me/Me'
import Disscuss from './../disscuss/Disscuss'
import MusicPlayer from './../../widgets/musicPlayer/MusicPlayer';

import { Route, Switch } from 'react-router-dom'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="page">
          <Switch>
            <Route path="/blog" component={Blog} />
            <Route path="/me" component={Me} />
            <Route path="/discuss" component={Disscuss} />
            <Route path="/" exact component={Greet} />
          </Switch>
        </div>
        <MusicPlayer></MusicPlayer>
      </div>
    )
  }
}

export default App
