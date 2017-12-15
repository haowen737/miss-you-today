import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Disscuss from './../disscuss/Disscuss'
import SignIn from './../signIn/SignIn'
import Greet from './../greet/Greet'
import Blog from './../blog/Blog'
import Me from './../me/Me'

import MusicPlayer from './../../widgets/musicPlayer/MusicPlayer';

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="page">
          <Switch>
            <Route path="/blog" component={Blog} />
            <Route path="/me" component={Me} />
            <Route path="/signin" component={SignIn} />
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
