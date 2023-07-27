import * as api from "../api";
import { setCurrentUser } from "./currentUser";
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    alert(error.response.data.message);
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const forgotPassword =
  ({ email }, navigate) =>
  async (dispatch) => {
    console.log(email);
    try {
      const res = await api.forgotPassword({ email });
      if (res.status === 200) {
        alert(res.data.message + " to " + email);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const resetPassword =
  ({ password, token }, navigate) =>
  async (dispatch) => {
    try {
      const res = await api.resetPassword({ password, token });
      console.log(res);
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/Auth");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
