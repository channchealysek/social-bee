import React, { useContext } from "react";
import { Card, Image, Button, Segment } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../../utils/auth";

export default function FriendCard({
  user: { id, username, email, createdAt, friends },
}) {
  const { user } = useContext(AuthContext);
  if (!user) window.location.assign("/login");
  const handleClick = (event) => {
    const getBtnName = event.currentTarget.getAttribute("name");
    if (event.currentTarget.getAttribute("name") === username)
      document.getElementsByName({ getBtnName }).disabled = "true";
  };
  return (
    <Card className="ui card fluid" style={{ padding: 10 }}>
      <Segment.Inline>
        <Card.Content>
          <Card.Header>
            <span>
              <Image
                avatar
                floated="left"
                size="large"
                src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              />
            </span>
            {username}
          </Card.Header>
          <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button
            name={username}
            floated="right"
            icon="add"
            label={{ as: "a", basic: true, content: "480" }}
            labelPosition="left"
            color="blue"
            onClick={handleClick}
          />
        </Card.Content>
      </Segment.Inline>
    </Card>
  );
}
