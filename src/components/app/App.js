import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Animate from 'rc-animate';

import { CSSTransitionGroup } from 'react-transition-group';

import Dashboard from './../dashboard/Dashboard';
import page404 from './../404/404';

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

class App extends Component {
  render() {
    return (
      <div>
        <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        >
          <Switch>
            <Route exact path="/" component={AppWelcome}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route component={page404}/>
          </Switch>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default App;
