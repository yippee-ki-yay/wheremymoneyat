import React, { Component } from 'react';
import './EntryList.css';

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entries: ''
    };

  }

  componentWillReceiveProps(props) {

    const entryTables = props.entries.map(entry =>
      <tr key={ entry._id }>
        <td>{ entry.text }</td>
        <td>{ entry.tags }</td>
        <td>{ entry.price }</td>
      </tr>
    );

    this.setState({
      entries: entryTables
    });

  }



  render() {
    return (
      <div className="col-md-8 col-md-offset-2 entry-list">
        <h4>List of Entries</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Tags</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { this.state.entries }
          </tbody>
        </table>
      </div>
    );
  }

}

export default EntryList;
