import React, { Component } from 'react'
import Greet from './../greet/Greet'
import Header from './../header/Header';
import Blog from './../blog/Blog';

import { Route, Switch } from 'react-router-dom'

import './App.css'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      heroIndex: 0,
      hero: {}
    }
  }
  handleHeroChange (hero) {
    this.setState({hero: hero})
  }
  render() {
    const { hero } = this.state
    return (
      <div className="app" style={{backgroundColor: hero.theme}}>
        <Header theme={hero.headerTheme}></Header>
        <div className="page">
          <Switch>
            <Route path="/blog" component={Blog} />
            <Route path="/" children={() => (
              <div className="container">
                <Greet onHeroChange={this.handleHeroChange.bind(this)}></Greet>
              </div>
            )} />
          </Switch>
        </div>
      </div>
    )
  }
}
