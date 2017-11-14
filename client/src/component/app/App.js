import React, { Component } from 'react';
import Greet from './../greet/Greet';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Greet></Greet>
      </div>
    );
  }
}

export default App;
