import React, { Component } from 'react';
import './EntryList.css';
import axios from 'axios';

class EntryList extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="col-md-8 col-md-offset-2 entry-list">
        <h4>List of Entries</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Tags</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Potrosio na cokolade</td>
              <td>#food</td>
              <td>500</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default EntryList;
