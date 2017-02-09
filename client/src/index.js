import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import { browserHistory } from 'react-router';

import Routes from './Routes';
import store from './Store';

ReactDOM.render((
  <Provider store={ store }>
    <Routes history={ browserHistory }>
    </Routes>
  </Provider>
  ),
  document.getElementById('root')
);
