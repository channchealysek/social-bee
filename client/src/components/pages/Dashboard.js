import React, { useContext } from "react";
import {
  Grid,
  Card,
  Image,
  Icon,
  Button,
} from "semantic-ui-react";
import { AuthContext } from "../../utils/auth";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <Grid.Column>
      {user && (
        <Card>
          <Card.Content>
          <Image className="ui card avatar"
            src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          />
            <Card.Meta>
            <a href="#">
              10 Friends
            </a>
            <Button
              color="darkblue"
              floated="right"
            >
              <Icon name="users" style={{ margin: 0 }} /> Add Friend
            </Button>
            </Card.Meta>
          </Card.Content>
        </Card>
      )}
    </Grid.Column>
  );
}
