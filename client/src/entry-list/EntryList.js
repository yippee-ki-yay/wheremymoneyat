import React, { Component } from 'react';
import './EntryList.css';
import axios from 'axios';

import decode from 'jwt-decode';

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.jwt = localStorage.getItem('wheremymoneyat-jwt');
    this.user = decode(this.jwt);

    console.log(props);
  }

  componentWillMount() {
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
