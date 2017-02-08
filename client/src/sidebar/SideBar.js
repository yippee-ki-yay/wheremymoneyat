import React, { Component } from 'react';
import './SideBar.css';

import logo from './money.png';
import HomeStats from './home-stats/HomeStats';
import Menu from './menu/Menu';

class SideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      stats: {}
    };
  }

  componentWillReceiveProps(props) {

    this.setState({
      entries: props.entries,
      stats: props.stats
    });

  }

  render() {
    return (
      <div id="sidebar-wrapper">
          <ul className="sidebar-nav">

          <li className="sidebar-brand">
             <img src={ logo } />
           </li>

           <hr />
            <Menu />
           <hr />
            <HomeStats entries={ this.state.entries } stats={ this.state.stats } />
          </ul>
      </div>
    );
  }

}


export default SideBar;
