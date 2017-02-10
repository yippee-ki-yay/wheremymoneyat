import React, { Component } from 'react';
import './HomeStats.css';
import store from '../../Store';
import axios from 'axios';
import * as types from '../../actions/actions-types';

import { connect } from 'react-redux';

import decode from 'jwt-decode';

class HomeStats extends Component {

  constructor(props) {
    super(props);

    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

  }

  componentDidMount() {
    axios.get('http://localhost:6969/api/stats/' + this.user._id , {
      headers: {
        Authorization: 'Bearer ' + this.jwt
      }
    })
    .then((resp) => {
      console.log(resp);

      store.dispatch({
        type: types.GET_HOME_STATS,
        stats: resp.data
      });

    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <span>
         <li className="today-header">
           Today

           <div className="price">
             ${ this.props.stats.day }
           </div>
         </li>

         <li className="today-header">
           Weekly

           <div className="price">
             ${ this.props.stats.week }
           </div>
         </li>

         <li className="today-header">
           Monthly

           <div className="price">
             ${ this.props.stats.month }
           </div>
         </li>
      </span>

    );
  }

}

const mapStateToProps = (store) => {
  return {
    stats: store.entryState.stats
  };
};


export default connect(mapStateToProps)(HomeStats);
