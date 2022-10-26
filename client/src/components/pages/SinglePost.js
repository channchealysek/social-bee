import React, { useContext } from "react";
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_POST } from '../../utils/queries';

export default function SinglePost(props) {
  const { postId } = useParams();
   console.log(postId)
  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId }
  });
  const getPost = data?.getPost || {}
  console.log(data?.getPost)

  let postMarkup;
  if(!getPost) {

  }else{

  }
  return postMarkup;


}