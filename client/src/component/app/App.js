import React, { Component } from 'react'
import Greet from './../greet/Greet'
import Blog from './../blog/Blog';
import MusicPlayer from './../../widgets/musicPlayer/MusicPlayer';

import { Route, Switch } from 'react-router-dom'

import './App.css'

export default class App extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <div className="app">
        <div className="page">
          <Switch>
            <Route path="/blog" component={Blog} />
            <Route path="/" exact component={Greet} />
          </Switch>
        </div>
        <MusicPlayer theme={{}}></MusicPlayer>
      </div>
    )
  }
}
