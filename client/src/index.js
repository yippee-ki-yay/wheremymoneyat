import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { browserHistory } from 'react-router';

import Routes from './Routes';

ReactDOM.render((
  <Routes history={browserHistory}>
  </Routes>
  ),
  document.getElementById('root')
);
