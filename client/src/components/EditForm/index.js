import React from "react";

import { Form, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

import { EDIT_POST } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POST } from "../../utils/queries";

export default function PostForm({ postId }) {
  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  const getPost = data?.getPost || {};

  const { values, onChange, onSubmit } = useForm(editPost, {
    body: "",
  });

  console.log(postId);
  console.log(values.body);

  const [createEditPost, { error }] = useMutation(EDIT_POST, {
    variables: { postId, body: values.body },
  });

  function editPost(event) {
    // event.preventDefault();
    createEditPost();
  }
  let makeUpEditPost;
  if (loading) {
  }
  {
    const { body } = getPost;
    values.body = body + "TESTU UPDATE";
    makeUpEditPost = (
      <>
        <Form onSubmit={onSubmit}>
          <h2>Edit a post:</h2>
          <Form.Field>
            <Form.TextArea
              placeholder="Tell us more"
              style={{ minHeight: 100 }}
              name="body"
              onChange={onChange}
              value={values.body}
              error={error ? true : false}
            />
            <Button
              type="submit"
              color="teal"
              floated="right"
              style={{ marginBottom: 20 }}
            >
              Update
            </Button>
          </Form.Field>
        </Form>
        {error && (
          <div
            className="ui error message"
            style={{ marginBottom: 20, width: 350 }}
          >
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </>
    );
  }

  return makeUpEditPost;
}
