import * as types from '../actions/actions-types';

const initialEntryState = {
  entries: []
};

const entryReducer = (state = initialEntryState, action) => {

  switch (action.type) {
    case types.ADD_ENTRY:
      return {entries: [action.entry, ...state.entries]};
    case types.LIST_ENTRIES:
      return {entries: action.entries};
    default:
      return state;
  }

};

export default entryReducer;
