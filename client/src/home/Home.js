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

  addEntry = (entry) => {

    this.setState({
      entries: this.state.entries.concat(entry)
    });
  }

  componentDidMount() {
    axios.get('http://localhost:6969/api/entries/' + this.user._id, {
      headers: {
        Authorization: 'Bearer ' + this.jwt
      }
    })
    .then((resp) => {
      console.log(resp);
      this.setState({
        entries: resp.data
      });
    });
  }

  render() {
    return (
      <div>
        <Entry addEntry={ this.addEntry }/>
        <EntryList entries={ this.state.entries }/>
      </div>
    );
  }


}

export default Home;
