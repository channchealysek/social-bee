import React, { useContext } from "react";
import { Card, Icon, Image, Button, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import MyPopup from "../../utils/MyPopup";
import moment from "moment";
import { AuthContext } from "../../utils/auth";

export default function PostCard({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card className="ui card fluid">
      <Card.Content>
        <Card.Header>
          <span>
            <Image
              avatar
              floated="left"
              size="large"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
          </span>
          {username}
        </Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Segment.Inline>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>
          <Button
            icon="share"
            label={{ as: "a", basic: true, content: "2,048" }}
            labelPosition="left"
          />
          <Button.Group floated="right">
            {user && user.username === username && <EditButton postId={id} />}
            {user && user.username === username && <DeleteButton postId={id} />}
          </Button.Group>
        </Segment.Inline>
      </Card.Content>
    </Card>
  );
}
