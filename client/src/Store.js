import { createStore, combineReducers } from 'redux';

import EntryReducer from './reducers/Entry.reducer';
import StatsReducer from './reducers/Stats.reducer';

const reducers = combineReducers({
  entryState: EntryReducer,
  statsState: StatsReducer
});

const store = createStore(reducers);

export default store;
