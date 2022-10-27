import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { DELETE_POST, DELETE_COMMENT } from '../../utils/mutations'
import { QUERY_POSTS } from "../../utils/queries";
import MyPopup from '../../utils/MyPopup';

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: QUERY_POSTS,
      });
      proxy.writeQuery({
  
          query: QUERY_POSTS,
          data: {
              getPosts: data.getPosts.filter((post) => post.id !== postId),
          },
      });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
};