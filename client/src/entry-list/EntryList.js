import React, { Component } from 'react';
import './EntryList.css';

import * as types from '../actions/actions-types';

import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import store from '../Store';

import * as utils from '../utils/utils';

import InlineEdit from 'react-edit-inline';

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.user = utils.userInfo();
    this.authHeader = utils.authHeader();

  }

  searchByTag = (tag) => {

    //remove the # from tag as it makes it invalid api request
    tag = tag.substring(1);

    axios.get(`http://localhost:6969/api/tags/${this.user._id}/tag/${tag}` , this.authHeader)
    .then((resp) => {
      console.log(resp);
      store.dispatch({
        type: types.LIST_ENTRIES_BY_TAG,
        entries: resp.data
      });
    });
  }

  componentDidMount() {

    axios.get(`http://localhost:6969/api/days/7/entries/${this.user._id}`, this.authHeader)
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

  showTitle = (index, days) => {

    let entryDate = moment(days.entries[0].createdOn);

    if(moment().isSame(entryDate, 'day')) {
      return "Today";
    } else if(moment().subtract(1, 'days').isSame(entryDate, 'day')) {
      return "Yesterday";
    } else {
      return entryDate.format('dddd, Do MMM');
    }
  }

  deleteEntry = (tableIndex, day, entryId) => {
    console.log(day + " " + tableIndex + " " + entryId);

    axios.delete(`http://localhost:6969/api/entries/${entryId}`, this.authHeader)
    .then((resp) => {
      console.log(resp);

      store.dispatch({
        type: types.DELETE_ENTRY,
        position: {day, tableIndex}
      });

    });
  }

  updateEntry = (entry, updatedField) => {

     const updatedEntry = Object.assign({}, entry, updatedField);

     axios.put(`http://localhost:6969/api/entries/${entry._id}`, updatedEntry,  this.authHeader)
     .then((resp) => {
       console.log(resp);

     });
  };

  render() {

    return (
      <div>
      {this.props.entries.map((days, index) =>
      <div key={ days._id } className="col-md-12  entry-list">
        <h3>{ this.showTitle(index, days) }</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Tags</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              days.entries.map((entry, i) =>
              <tr key={ entry._id }>
                <td><InlineEdit text={ entry.text } change={(text) => this.updateEntry(entry, text)} paramName="text"/></td>
                <td>
                {
                  this.showTags(entry.tags)
                }
                 </td>
                <td className="price">$<InlineEdit text={ entry.price.toString() } change={(price) => this.updateEntry(entry, price)} paramName="price"/></td>
                <td><button className="remove-btn" onClick={ () => this.deleteEntry(i, index, entry._id) }>X</button></td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>
      )}
      </div>
    );
  }

}

const mapStateToProps = (store) => {
  return {
    entries: store.mainState.entries
  };
};

export default connect(mapStateToProps)(EntryList);
