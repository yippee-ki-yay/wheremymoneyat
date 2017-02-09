import React, { Component } from 'react';

import './Home.css';

import Entry from '../entry/Entry';
import EntryList from '../entry-list/EntryList';
import SideBar from '../sidebar/SideBar';

import decode from 'jwt-decode';

class Home extends Component {
  constructor (props) {
    super(props);

    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

    this.state = {
      stats: {}
    };
  }


  render() {
    return (
      <div className="home">
        <SideBar stats={ this.state.stats } />
        <Entry/>
        <EntryList/>
      </div>
    );
  }


}

export default Home;
