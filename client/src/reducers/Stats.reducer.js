import * as types from '../actions/actions-types';

const initialStatsState = {
  stats: {}
};

const statsReducer = (state = initialStatsState, action) => {

  switch (action.type) {
    case types.GET_HOME_STATS:

      const sumToday = action.entries.reduce( (a, b) => ({price: a.price + b.price}));

      return { stats: {
         month: action.stats.monthPrice,
         week: action.stats.weekPrice,
         day: sumToday.price
      }};
    default:
      return state;
  }

};

export default statsReducer;
