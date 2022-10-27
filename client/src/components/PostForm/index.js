import React from "react";

import { Form, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

import { CREATE_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";

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
        data: {...data,
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
          <Form.TextArea
            placeholder='Tell us more' 
            style={{ minHeight: 100 }}
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal" floated="right">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20, width: 350 }}>
          <ul className="list">
            <li>
                {error.graphQLErrors[0].message}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
