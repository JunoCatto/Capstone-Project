import { useReducer } from "react";

export const initialState = (() => {
  // managing the user state for persistence
  try {
    const storedUser = localStorage.getItem("user");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      loading: false,
      error: null,
    };
  } catch (err) {
    console.serror("Invalid user data", err);
    localStorage.removeItem("user");
    return { user: null, loading: false, error: null };
  }
})();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
