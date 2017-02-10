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
      return {entries: action.entries, stats: {}};
    case types.GET_HOME_STATS:

      console.log(state.stats);

      const sumToday = state.entries.reduce( (a, b) => ({price: a.price + b.price}));

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
