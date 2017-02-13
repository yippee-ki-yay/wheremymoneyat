import React, { Component } from 'react';

import './Budget.css';

class Budget extends Component {


  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="budget-panel panel panel-default">
            <div className="panel-heading general-budget-header">General Budget</div>
            <div className="panel-body general-budget-body">

              <div className="form-inline">
                <div className="form-group">
                  <label className="label-spent"> I want to spend: </label>
                  <input type="number" className="form-control" placeholder="amount" /> $
                </div>
                <div className="form-group">
                  <label className="label-every"> every </label>
                  <select className="form-control" id="sel1">
                   <option>Month</option>
                   <option>Week</option>
                   <option>Two Weeks</option>
                   <option>Day</option>
                 </select>
                </div>
                <button type="submit" className="btn-save-budget btn btn-default">Save Budget</button>
              </div>

            </div>

            <div className="panel-heading">Budget by hashtag [WIP]</div>
            <div className="panel-body">

            <div className="form-inline">
              <div className="form-group">
                <label> I want to spend: </label>
                <input type="number" className="form-control" placeholder="amount" /> $
              </div>
              <div className="form-group">
                <label> every </label>
                <select className="form-control" id="sel1">
                 <option>Month</option>
                 <option>Week</option>
                 <option>Two Weeks</option>
                 <option>Day</option>
               </select>
              </div>
              <div className="form-group">
                <label> on </label>
                #<input type="text" className="form-control" placeholder="tags" />
              </div>
              <button type="submit" className="btn btn-default">Add Budget</button>
            </div>

            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default Budget;
