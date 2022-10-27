import React from "react";
import { Card, Grid, Image, Input } from "semantic-ui-react";
export default function Register() {
  return (
    <>
      <h1>My infor....</h1>
      <Image
        avatar
        floated="left"
        size="small"
        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
      />
      <Card fluid>
        <Card.Content width={12} className="ui fluid">
            <Grid.Row fluid>
            <Input icon="user" iconPosition="left" placeholder="username" />
            <Input icon="mail" iconPosition="left" placeholder="e-mail" />
            </Grid.Row>
          <Input icon="image" iconPosition="left" placeholder="image url" />
        </Card.Content>
      </Card>
    </>
  );
}
