import React, { useContext } from "react";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";
import MyPopup from "../../utils/MyPopup";
import moment from "moment";
import { AuthContext } from "../../utils/auth";

export default function PostCard({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <Card>
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
          <LikeButton user={user} post={{ id, likes, likeCount }}/>
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
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
      </Card>
    </Card>
  );
}
