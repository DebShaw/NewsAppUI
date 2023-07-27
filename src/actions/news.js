import * as api from "../api";
export const saveNews = (newsData) => async (dispatch) => {
  try {
    const { userId, newsUrl, newsImage, newsTitle, newsDescription } = newsData;
    const { data } = await api.saveNews(
      userId,
      newsUrl,
      newsImage,
      newsTitle,
      newsDescription
    );
    dispatch({ type: "SAVE_NEWS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const visitNews = (newsData) => async (dispatch) => {
  try {
    const { userId, newsUrl, newsImage, newsTitle, newsDescription } = newsData;
    const { data } = await api.visitNews(
      userId,
      newsUrl,
      newsImage,
      newsTitle,
      newsDescription
    );
    dispatch({ type: "VISIT_NEWS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchSavedNews = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchSavedNews(userId);
    dispatch({ type: "FETCH_NEWS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchRecentVisits = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchRecentVisits(userId);
    dispatch({ type: "FETCH_RECENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteNews = (newsData) => async (dispatch) => {
  try {
    const { userId, newsId } = newsData;
    const { data } = await api.deleteNews(userId, newsId);
    console.log(data);
    dispatch(fetchSavedNews(userId));
  } catch (error) {
    console.log(error);
  }
};
export const saveKeyword = (newsData) => async (dispatch) => {
  try {
    const { userId, keyword } = newsData;
    const { data } = await api.saveKeyword(userId, keyword);
    dispatch({ type: "SAVE_KEYWORD", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchKeywords = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchKeywords(userId);
    dispatch({ type: "FETCH_KEYWORDS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const removeNews = (newsData) => async (dispatch) => {
  try {
    const { userId, newsId } = newsData;
    const { data } = await api.removeNews(userId, newsId);
    console.log(data);
    dispatch(fetchRecentVisits(userId));
  } catch (error) {
    console.log(error);
  }
};
