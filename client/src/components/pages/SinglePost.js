import React, { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POST } from "../../utils/queries";
import { SUBMIT_COMMENT } from "../../utils/mutations";
import { AuthContext } from "../../utils/auth";
import moment from "moment";
import {
  Button,
  Card,
  Grid,
  Form,
  Image,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import MyPopup from "../../utils/MyPopup";

export default function SinglePost() {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  const getPost = data?.getPost || {};

  const [submitComment] = useMutation(SUBMIT_COMMENT, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    window.location.assign("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading Post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              size="small"
              float="left"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <Segment.Inline>
                  <LikeButton user={user} post={{ id, likes, likeCount }} />
                  <MyPopup content="Comment on post">
                    <Button
                      as="div"
                      labelPosition="right"
                      // onClick={() => console.log("Comment on post!")}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label as="a" basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  </MyPopup>

                  {/* <Button
                    icon="share"
                    label={{ as: "a", basic: true, content: "2,048" }}
                    labelPosition="left"
                  /> */}

                  <Button.Group floated="right">
                    {user && user.username === username && (
                      <EditButton postId={id}/>
                    )}
                    {user && user.username === username && (
                      <DeleteButton postId={id} callback={deletePostCallback} />
                    )}
                  </Button.Group>
                </Segment.Inline>
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}
