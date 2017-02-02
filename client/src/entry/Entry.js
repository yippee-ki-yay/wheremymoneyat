import React, { Component } from 'react';
import './Entry.css';
import axios from 'axios';

class Entry extends Component {

  constructor(props) {
    super(props);

    this.state = {text: ''};
  }

  addEntry() {
    console.log(`Entry added `);

    axios.get('http://localhost:6969/api/test')
    .then((resp) => {
      console.log(resp);
    });
  }

  render() {
    return (
      <div className="main-form">
        <input type="text"  className="big-input"></input>
        <button type="button" className="entry-btn" onClick={this.addEntry}>Spent</button>
      </div>
    )
  }

}

export default Entry;
