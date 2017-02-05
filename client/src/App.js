import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './home/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Home />
      </div>
    );
  }
}

export default App;
