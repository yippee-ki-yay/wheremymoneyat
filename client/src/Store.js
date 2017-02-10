import { createStore, combineReducers } from 'redux';

import EntryReducer from './reducers/Entry.reducer';

const reducers = combineReducers({
  entryState: EntryReducer
});

const store = createStore(reducers);

export default store;
