import React, { Component } from 'react';

import './Home.css';

import Entry from '../entry/Entry';
import EntryList from '../entry-list/EntryList';
import InfoStrip from './info-strip/InfoStrip';

class Home extends Component {

  render() {
    return (
      <div>
        <Entry/>
        <InfoStrip/>
        <EntryList/>
      </div>
    );
  }


}

export default Home;
