import React, { Component } from 'react';
import './SideBar.css';

import logo from './money.png';
import HomeStats from './home-stats/HomeStats';
import Menu from './menu/Menu';
import { userInfo } from "../utils/utils";
import { browserHistory } from 'react-router';

class SideBar extends Component {

  signOut = () => {
    localStorage.clear();
    browserHistory.push('/login');
  }

  render() {
    return (
      <div id="sidebar-wrapper">
          <ul className="sidebar-nav">

          <li className="sidebar-brand">
             <img className="logo-image" alt="jbg nema" src={ logo } />
           </li>
           <li>
            <div className="sidebar__welcome-text">
              Welcome, {userInfo().name}! (<span onClick={ this.signOut } className="sidebar__sign-out">Sign out?</span>)
            </div>
           </li>
           <hr />
            <Menu />
           <hr />
            <HomeStats />
          </ul>
      </div>
    );
  }

}


export default SideBar;
