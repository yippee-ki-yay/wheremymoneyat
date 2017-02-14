import * as types from '../actions/actions-types';


const initialEntryState = {
  entries: [],
  stats: {},
  budget: {
    budgetPrice: 0,
    budgetInterval: "Month"
  }
};

const entryReducer = (state = initialEntryState, action) => {

  switch (action.type) {
    case types.ADD_ENTRY:

      let addStats =  Object.assign({}, state, {
        stats: {
          month: state.stats.month + action.entry.price,
          week: state.stats.week + action.entry.price,
          day: state.stats.day + action.entry.price
        }
      });

      // A VERY BAD DEEP COPY...mmmokay
      let newState = JSON.parse(JSON.stringify(addStats));

      if(newState.entries[0]) {
        //TODO: if there is an entry date, create new one if it's not today
        newState.entries[0].entries.unshift(action.entry);
      } else {
        newState.entries = [];
        newState.entries.push({entries: [action.entry]});
      }


      return newState;
    case types.LIST_ENTRIES:
      return Object.assign({}, state, {entries: action.entries});
    case types.LIST_ENTRIES_BY_TAG:
      return Object.assign({}, state, {entries: action.entries});
    case types.GET_HOME_STATS:
      return Object.assign({}, state, {
        stats: {
         month: action.stats.monthPrice,
         week: action.stats.weekPrice,
         day: action.stats.dayPrice
      }});
    case types.DELETE_ENTRY: {
      let newState = JSON.parse(JSON.stringify(state));

      newState.entries[action.position.day].entries.splice(action.position.tableIndex, 1);

      return newState;
    }

    case types.UPDATE_BUDGET:
      return Object.assign({}, state, {budget: action.budget});

    case types.GET_BUDGET:
      const { price, interval }  = action.budgets[0];

      console.log(price +  " " + interval);

      return Object.assign({}, state, {
        budget: {
          budgetPrice: price,
          budgetInterval: interval
        }});

    default:
      return state;
  }

};

export default entryReducer;
