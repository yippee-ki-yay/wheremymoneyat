import React, { Component } from 'react';

import './Preference.css';

import { currencies } from './currencies.js';

class Preference extends Component {

  constructor(param) {
    super(param);

    this.currencies = Object.keys(currencies).map(key =>
    <option value={currencies[key].symbol} key={ key }>{`${key} - ${currencies[key].label}`}</option>);
  }

  currencySelect = (e) => {
    console.log(e);
  }

  onInputChange = (event) => {

    console.log(event.target.value);

  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="pref-panel panel panel-default">
            <div className="panel-heading">Preference</div>
            <div className="panel-body">

              <div className="form-group">
                <label>Pick currency</label>
                <select onChange={ this.onInputChange } className="form-control">
                  { this.currencies }
                </select>
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
