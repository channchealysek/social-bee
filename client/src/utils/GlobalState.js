import React, { createContext, useContext } from "react";
import { usePostReducer } from "./reducers";

const PostContext = createContext();
const { Provider } = PostContext;

const PostProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = usePostReducer({
    posts: [],
    likes: [],
    likeCount: '',
    comments: [],
    commentCount: ''
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };
