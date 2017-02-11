import * as types from '../actions/actions-types';

const initialEntryState = {
  entries: [],
  stats: {}
};

const entryReducer = (state = initialEntryState, action) => {

  switch (action.type) {
    case types.ADD_ENTRY:

      return {
        entries: [action.entry, ...state.entries],
        stats: {
          month: state.stats.month + action.entry.price,
          week: state.stats.week + action.entry.price,
          day: state.stats.day + action.entry.price
        }
      };
    case types.LIST_ENTRIES:
      return Object.assign({}, state, {entries: action.entries});
    case types.LIST_ENTRIES_BY_TAG:
      return Object.assign({}, state, {entries: action.entries});
    case types.GET_HOME_STATS:

      let sumToday = {price: 0};

      if(state.entries.length > 0) {
        sumToday = state.entries.reduce( (a, b) => ({price: a.price + b.price}));
      }


      return {
        entries: state.entries,
        stats: {
         month: action.stats.monthPrice,
         week: action.stats.weekPrice,
         day: sumToday.price
      }};
    default:
      return state;
  }

};

export default entryReducer;
