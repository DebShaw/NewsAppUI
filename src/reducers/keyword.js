const keywordReducer = (state = null, action) => {
  switch (action.type) {
    case "SAVE_KEYWORD":
      return action.payload;
    case "FETCH_KEYWORDS":
      return action.payload;
    default:
      return state;
  }
};
export default keywordReducer;
