import React, { Component } from 'react';

import './Preference.css';

class Preference extends Component {


  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="pref-panel panel panel-default">
            <div className="panel-heading">Preference</div>
            <div className="panel-body">

              <div className="form-group">
                <label>Pick currency</label>
                <div className="bfh-selectbox bfh-currencies" data-currency="EUR" data-flags="true">
                </div>
              </div>

              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default Preference;
