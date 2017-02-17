import React, { Component } from 'react';

import './Budget.css';

import * as types from '../actions/actions-types';
import * as utils from '../utils/utils';

import axios from 'axios';
import { connect } from 'react-redux';
import store from '../Store';

class Budget extends Component {

  constructor(props) {
    super(props);

    this.user = utils.userInfo();
    this.authHeader = utils.authHeader();

    this.state = {
      budgetPrice: props.budget.budgetPrice,
      budgetInterval: props.budget.budgetInterval
    };
  }

  componentDidMount() {

    axios.get(`http://localhost:6969/api/budget/${this.user._id}`, this.authHeader)
    .then((resp) => {

      store.dispatch({
        type: types.GET_BUDGET,
        budgets: resp.data
      });

      this.setState({
        budgetPrice: resp.data[0].price,
        budgetInterval: resp.data[0].interval
      });

    });
  }

  updateBudget = () => {
    console.log(this.state);
    const budget = Object.assign({}, this.state, {type: 'general'});

    axios.post(`http://localhost:6969/api/budget/${this.user._id}` , budget,  this.authHeader)
    .then((resp) => {
      console.log(resp);

      store.dispatch({
        type: types.UPDATE_BUDGET,
        budget: this.state
      });

    });

  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

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
                  <input
                    value={ this.state.budgetPrice }
                    onChange={ this.onInputChange }
                    type="number"
                    name="budgetPrice"
                    className="form-control"
                    placeholder="amount" /> $
                </div>
                <div className="form-group">
                  <label className="label-every"> every </label>
                  <select className="form-control" name="budgetInterval" value={ this.state.budgetInterval } onChange={ this.onInputChange }>
                   <option>Month</option>
                   <option>Week</option>
                   <option>Two Weeks</option>
                   <option>Day</option>
                 </select>
                </div>
                <button type="submit" onClick={ this.updateBudget } className="btn-save-budget btn btn-default">Save Budget</button>
              </div>

            </div>

          </div>
        </div>
      </div>

    );
  }

}


const mapStateToProps = (store) => {
  return {
    budget: store.mainState.budget
  };
};


export default connect(mapStateToProps)(Budget);
