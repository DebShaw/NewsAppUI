const newsReducer = (state = null, action) => {
  switch (action.type) {
    case "SAVE_NEWS":
      return action.payload;
    case "FETCH_NEWS":
      return action.payload;
    case "DELETE_NEWS":
      return { ...state, data: action?.data };
    default:
      return state;
  }
};
export default newsReducer;
