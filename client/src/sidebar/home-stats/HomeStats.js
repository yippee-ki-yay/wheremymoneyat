import React, { Component } from 'react';
import './HomeStats.css';
import store from '../../Store';
import axios from 'axios';
import * as types from '../../actions/actions-types';
import * as utils from '../../utils/utils';

import { connect } from 'react-redux';


class HomeStats extends Component {

  constructor(props) {
    super(props);

    this.user = utils.userInfo();
    this.authHeader = utils.authHeader();
  }

  componentDidMount() {
    axios.get(`http://localhost:6969/api/stats/${this.user._id}`, this.authHeader)
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
         <li>
           <span className="price-header">Today</span>
           <div className="price-stats">
             ${ this.props.stats.day }
           </div>
         </li>

         <li>
           <span className="price-header">This Week</span>
           <div className="price-stats">
             ${ this.props.stats.week }
           </div>
         </li>

         <li>
           <span className="price-header">This Month</span>
           <div className="price-stats">
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
