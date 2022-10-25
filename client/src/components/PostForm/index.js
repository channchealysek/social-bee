import React from "react";

import { Form, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

import { CREATE_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import { useMutation } from "@apollo/react-hooks";

export default function PostForm() {

  const { values, onChange, onSubmit } = useForm(newPost, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: QUERY_POSTS,
      });
      proxy.writeQuery({
        query: QUERY_POSTS,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  function newPost() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>
                {error.graphQLErrors[0].message}
                {/* {error.networkError.result.errors[0].message} */}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
