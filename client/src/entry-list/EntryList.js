import React, { Component } from 'react';
import './EntryList.css';

import { connect } from 'react-redux';
import store from '../Store';

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entries: ''
    };

    console.log(props);

  }

  searchByTag = (tag) => {
    console.log(tag);
  }

  componentWillReceiveProps(props) {

    // console.log(props);
    //
    // const entryTables = props.entries.map(entry =>
    //   <tr key={ entry._id }>
    //     <td>{ entry.text }</td>
    //     <td>
    //     { entry.tags.map( t =>
    //       <span className="tag" onClick={ () => this.searchByTag(t) }> { t }
    //       </span>)
    //     }
    //      </td>
    //     <td>{ entry.price }</td>
    //   </tr>
    // );

    // this.setState({
    //   entries: entryTables
    // });

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
                { entry.tags.map( t =>
                  <span className="tag" onClick={ () => this.searchByTag(t) }> { t }
                  </span>)
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
