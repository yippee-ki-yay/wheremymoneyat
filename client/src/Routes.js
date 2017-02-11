import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import Register from './register/Register';
import Login from './login/Login';
import Preference from './preference/Preference';
import Stats from './stats/Stats';
import Budget from './budget/Budget';
import Reminders from './reminders/Reminders';
import SideBar from './sidebar/SideBar';
import Home from './home/Home';
import * as utils from './utils/utils.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={ App } onEnter={ utils.requireAuth }>
      <IndexRoute components={{ main:Home, sidebar:SideBar }} />
      <Route path="preference" components={{ main:Preference, sidebar:SideBar }} />
      <Route path="stats" components={{ main:Stats, sidebar:SideBar }} />
      <Route path="budget" components={{ main:Budget, sidebar:SideBar }} />
      <Route path="reminders" components={{ main:Reminders, sidebar:SideBar }} />
    </Route>
    <Route path="/register" component={ Register } />
    <Route path="/login" component={ Login } />
  </Router>
);

export default Routes;
