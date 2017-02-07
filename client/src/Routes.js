import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Register from './register/Register';
import Login from './login/Login';
import Preference from './preference/Preference';
import Stats from './stats/Stats';
import Budget from './budget/Budget';
import Reminders from './reminders/Reminders';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={ App } >
      <Route path="preference" component={ Preference } />
      <Route path="stats" component={ Stats } />
      <Route path="budget" component={ Budget } />
      <Route path="reminders" component={ Reminders } />
    </Route>
    <Route path="/register" component={ Register } />
    <Route path="/login" component={ Login } />
  </Router>
);

export default Routes;
