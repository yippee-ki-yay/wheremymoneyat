import React, { Component } from 'react';
import './HomeStats.css';

import logo from '../money.png';

class HomeStats extends Component {

  constructor(props) {
    super(props);

    this.state = {
      priceToday: 0
    };
  }

  componentWillReceiveProps(props) {

    const sumToday = props.entries.reduce( (a, b) => ({price: a.price + b.price}));

    this.setState({
      priceToday: sumToday.price
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
             $0
           </div>
         </li>

         <li className="today-header">
           Monthly

           <div className="price">
             $0
           </div>
         </li>
      </span>

    );
  }

}


export default HomeStats;
