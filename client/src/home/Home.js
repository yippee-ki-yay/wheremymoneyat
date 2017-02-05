import React, { Component } from 'react';
import axios from 'axios';

import Entry from '../entry/Entry';
import EntryList from '../entry-list/EntryList';

import decode from 'jwt-decode';

class Home extends Component {
  constructor (props) {
    super(props);

    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

    this.state = {
      entries: []
    };
  }

  addEntry(entry) {
    this.setState({
      entries: this.state.entries.push(entry)
    });
  }

  componentWillMount() {
    console.log(this.state.entries);
  }

  render() {
    return (
      <div>
        <Entry />
        <EntryList entries={ this.state.entries }/>
      </div>
    );
  }


}

export default Home;
