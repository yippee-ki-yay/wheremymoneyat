const initialEntryState = {
  entries: []
};

const entryReducer = (state = initialEntryState, action) => {

  switch (action.type) {
    case 'ADD_ENTRY':
      console.log("ADD ENTRY being called in reducer");
      console.log(action.entry);
      return [...state.entries, action.entry];
    default:
      return state;
  }

};

export default entryReducer;
