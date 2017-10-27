import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import Dashboard from './../dashboard/Dashboard';
import Page404 from './../404/404';

import logo from './logo.svg';
import './App.css';

const AppWelcome = () => (
  <div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">How's Your Today?</h1>
      </header>
      <Link to="/dashboard">Enter</Link>
    </div>
  </div>
)

const AppMain = () => (
  <Switch>
    <Route exact path="/" component={AppWelcome}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route component={Page404}/>
  </Switch>
)

class App extends Component {
  render() {
    return (
      <div>
        <AppMain></AppMain>
      </div>
    );
  }
}

export default App;
