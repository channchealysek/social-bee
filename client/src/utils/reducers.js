import { useReducer } from "react";
import { UPDATE_POSTS } from './actions';

  export const reducer = (state, action) => {
    switch (action.type) {
          case UPDATE_POSTS:
            return {
              ...state,
              posts: action.posts
            };
        default:
          return state;
      }
  }

  export function usePostReducer(initialState) {
    return useReducer(reducer, initialState)
  }