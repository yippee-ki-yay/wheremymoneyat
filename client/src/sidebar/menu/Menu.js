import React, { Component } from 'react';
import './Menu.css';


class Menu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
         <li>
          <a href="/preference">Preferences</a>
         </li>

         <li>
          <a href="/stats">Stats</a>
         </li>

         <li>
          <a href="/budget">Budget</a>
         </li>

         <li>
          <a href="/reminders">Reminders</a>
         </li>
      </span>

    );
  }

}


export default Menu;