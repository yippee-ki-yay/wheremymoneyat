import React, { Component } from 'react';

import './Home.css';

import Entry from '../entry/Entry';
import EntryList from '../entry-list/EntryList';

class Home extends Component {

  render() {
    return (
      <div>
        <Entry/>
        <EntryList/>
      </div>
    );
  }


}

export default Home;
