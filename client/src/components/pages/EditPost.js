import React from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Card } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";
import { EDIT_POST } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POST } from "../../utils/queries";

export default function EditPost() {
  const { postId } = useParams();
  

  const { data } = useQuery(QUERY_POST, {
    variables: { postId },
  });
  const getPost = data?.getPost || {};
  const { body } = getPost;

  const { values, onChange} = useForm(editPost, {
    body: "",
  });
  const [updatePost, { error }] = useMutation(EDIT_POST);

  function editPost() {
    updatePost({variables: {
      postId,
      body: values.body.trim(),
    }});
  }
  let makeUpEditPost;
  makeUpEditPost = (
    <Card className="ui card fluid">
      <Form style={{padding: 30}}>
        <h2>Edit a post:</h2>
        <Form.Field >
          <Form.TextArea
            placeholder="How are you today?"
            style={{ minHeight: 100 }}
            name="body"
            onChange={onChange}
            value={values.body ? body.value : body}
            error={error ? true : false}
          />
          <Button
            type="submit"
            color="teal"
            floated="right"
            style={{ marginBottom: 20 }}
            as={Link}
            to={`/post/${postId}`}
            onClick={() => editPost()}
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
    </Card>
  );
  return makeUpEditPost;
}
