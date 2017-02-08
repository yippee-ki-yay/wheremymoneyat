import React, { Component } from 'react';
import './HomeStats.css';

import logo from '../money.png';

class HomeStats extends Component {

  constructor(props) {
    super(props);

    this.state = {
      priceToday: 0,
      priceThisWeek: 0,
      priceThisMonth: 0
    };
  }

  componentWillReceiveProps(props) {

    const sumToday = props.entries.reduce( (a, b) => ({price: a.price + b.price}));

    this.setState({
      priceToday: sumToday.price,
      priceThisMonth: props.stats.monthPrice,
      priceThisWeek: props.stats.weekPrice
    });

  }

  render() {
    return (
      <span>
         <li className="today-header">
           Today

           <div className="price">
             ${ this.state.priceToday }
           </div>
         </li>

         <li className="today-header">
           Weekly

           <div className="price">
             ${ this.state.priceThisWeek }
           </div>
         </li>

         <li className="today-header">
           Monthly

           <div className="price">
             ${ this.state.priceThisMonth }
           </div>
         </li>
      </span>

    );
  }

}


export default HomeStats;
