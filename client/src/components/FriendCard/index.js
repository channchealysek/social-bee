import React, { useContext, useState } from "react";
import { Card, Image, Button, Segment } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../../utils/auth";
import { ADD_FRIEND } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

export default function FriendCard({
  user: { id, username, email, createdAt, friends },
}) {
  const { user } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [addFriend] = useMutation(ADD_FRIEND)

  if (!user) window.location.assign("/login");
  const handleClick = (event) => {
    setDisabled(true);
    addFriend({variables: {
      friendId: event.currentTarget.id.trim(),
    }});
    let _friends = (document.getElementById("countfriends").textContent.split(" ")[0].trim());
    let newCounts = ++ _friends
    document.getElementById("countfriends").innerHTML = newCounts +  " friends";
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
            id={id}
            floated="right"
            icon="add"
            label={{ as: "a", basic: true, content: "480" }}
            labelPosition="left"
            color="blue"
            disabled={disabled}
            onClick={handleClick}
          />
        </Card.Content>
      </Segment.Inline>
    </Card>
  );
}
