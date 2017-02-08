import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Home.css';

import Entry from '../entry/Entry';
import EntryList from '../entry-list/EntryList';
import SideBar from '../sidebar/SideBar';
import Preference from '../preference/Preference';



import decode from 'jwt-decode';

class Home extends Component {
  constructor (props) {
    super(props);

    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

    this.state = {
      entries: [],
      stats: {}
    };
  }

  addEntry = (entry) => {

    this.setState({
      entries: this.state.entries.concat(entry)
    });
  }

  componentDidMount() {

    const currDate = moment().format();

    axios.get('http://localhost:6969/api/entries/' + this.user._id + '/' + currDate, {
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

    axios.get('http://localhost:6969/api/stats/' + this.user._id , {
      headers: {
        Authorization: 'Bearer ' + this.jwt
      }
    })
    .then((resp) => {
      console.log(resp);

      this.setState({
        stats: resp.data
      });

    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="home">
        <SideBar entries={ this.state.entries } stats={ this.state.stats } />
        <Entry addEntry={ this.addEntry }/>
        <EntryList entries={ this.state.entries }/>
      </div>
    );
  }


}

export default Home;
