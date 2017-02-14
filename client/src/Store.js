import { createStore, combineReducers } from 'redux';

import MainReducer from './reducers/Main.reducer';

const reducers = combineReducers({
  mainState: MainReducer
});

const store = createStore(reducers);

export default store;
