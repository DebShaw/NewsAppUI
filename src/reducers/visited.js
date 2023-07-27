const visitedReducer = (state = null, action) => {
  switch (action.type) {
    case "VISIT_NEWS":
      return action.payload;
    case "FETCH_RECENTS":
      return action.payload;
    default:
      return state;
  }
};
export default visitedReducer;
