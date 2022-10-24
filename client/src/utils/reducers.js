import { useReducer } from "react";
import { LOGIN, LOGOUT } from './actions';

  export const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
          return {
            ...state,
            user: action.payload
          };
        case LOGOUT:
          return {
            ...state,
            user: null
          };
        default:
          return state;
      }
  }

  export function usePostReducer(initialState) {
    return useReducer(reducer, initialState)
  }