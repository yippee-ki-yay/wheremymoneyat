import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {

    const { main, sidebar} = this.props;

    return (
      <div id="wrapper">
        <div>
          { sidebar }
        </div>
        <div>
          { main }
        </div>
      </div>
    );
  }
}

export default App;
