import React, { Component } from 'react';
import './Entry.css';
import axios from 'axios';

import * as types from '../actions/actions-types';

import decode from 'jwt-decode';

import store from '../Store';

class Entry extends Component {

  constructor(props) {
    super(props);
    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

    this.state = {entryText: ''};
  }

  addEntry = () => {

    const entry = {
      text: this.state.entryText,
      author: this.user._id
    };

    // Extract price, for now just gets a number if exists
    const prices = entry.text.match(/\d+/);

    entry.price = (prices) ? (+prices[0]) : 0;

    // Extract hashtags again for now very simple
    entry.tags = entry.text.match(/#[\w]+(?=\s|$)/g);

    axios.post('http://localhost:6969/api/entries', entry, {
      headers: {
        Authorization: 'Bearer ' + this.jwt
      }
    })
    .then((resp) => {

      store.dispatch({
        type: types.ADD_ENTRY,
        entry: resp.data
      });

    });
  }

  render() {
    return (
      <div className="row">
        <div className="input-group big-input col-md-9 col-md-offset-1">
          <input type="text" onChange={ this.onEntryChange } value={ this.state.entryText }
                placeholder="Where did your moneyz go today?" className="form-control" />
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={ this.addEntry } type="button">Spent</button>
          </span>
        </div>
      </div>
    )
  }

  onEntryChange = (e) => {
    this.setState({
      entryText: e.target.value
    });
  }

}

export default Entry;
