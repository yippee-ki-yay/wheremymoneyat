import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Register from './register/Register';
import Login from './login/Login';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
  </Router>
);

export default Routes;
