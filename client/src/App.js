import React, { Component } from 'react';
import logo from './logo.svg';
import Entry from './entry/Entry';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>#WhereMyMoneyAt</h2>
        </div>
        <p className="App-intro">
          What did you buy today?
        </p>
        <Entry />
      </div>
    );
  }
}

export default App;
