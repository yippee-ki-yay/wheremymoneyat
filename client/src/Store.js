import { createStore, combineReducers } from 'redux';

import EntryReducer from './entry/Entry.reducer';

const reducers = combineReducers({
  entryState: EntryReducer
});

const store = createStore(reducers);

export default store;
