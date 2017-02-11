import React, { Component } from 'react';
import './Entry.css';
import axios from 'axios';

import * as types from '../actions/actions-types';

import * as utils from '../utils/utils';

import store from '../Store';

class Entry extends Component {

  constructor(props) {
    super(props);
    this.user = utils.userInfo();
    this.authHeader = utils.authHeader();

    this.state = {entryText: ''};
  }

  addEntry = (e) => {

    if(e.key === 'Enter') {
      const entry = {
        text: this.state.entryText,
        author: this.user._id
      };

      // Extract price, for now just gets a number if exists
      const prices = entry.text.match(/\d+/);

      entry.price = (prices) ? (+prices[0]) : 0;

      // Extract hashtags again for now very simple
      entry.tags = entry.text.match(/#[\w]+(?=\s|$)/g);

      axios.post('http://localhost:6969/api/entries', entry, this.authHeader)
      .then((resp) => {

        store.dispatch({
          type: types.ADD_ENTRY,
          entry: resp.data
        });

        this.setState({
          entryText: ''
        });

      });
    }

  }

  render() {
    return (
      <div className="row">
        <div className="big-input col-md-12">
          <input type="text" onChange={ this.onEntryChange } onKeyPress={ this.addEntry } value={ this.state.entryText }
                placeholder="What have you spent your money on?"  className="form-control entry-input" />
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
