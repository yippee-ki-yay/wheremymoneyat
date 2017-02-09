import React, { Component } from 'react';
import './EntryList.css';

import * as types from '../actions/actions-types';

import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import store from '../Store';
import decode from 'jwt-decode';

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

  }

  searchByTag = (tag) => {
    console.log(tag);
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

      store.dispatch({
        type: types.LIST_ENTRIES,
        entries: resp.data
      });

    });
  }

  showTags = (tags) => {
    if(tags && tags.length > 0) {
      return (
        tags.map( t =>
        <span key={ t } className="tag" onClick={ () => this.searchByTag(t) }> { t }
        </span>)
      );
    }
  }

  render() {

    return (
      <div className="col-md-9 col-md-offset-1 entry-list">
        <h4>List of Entries </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Tags</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { this.props.entries.map(entry =>
              <tr key={ entry._id }>
                <td>{ entry.text }</td>
                <td>
                {
                  this.showTags(entry.tags)
                }
                 </td>
                <td>{ entry.price }</td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = (store) => {
  return {
    entries: store.entryState.entries
  };
};

export default connect(mapStateToProps)(EntryList);
