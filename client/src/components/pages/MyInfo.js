import React, { useContext } from "react";
import { Card, Image, Form, Label, Input } from "semantic-ui-react";
import { AuthContext } from "../../utils/auth";
export default function MyInfor() {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      {user && (
        <Card>
          <Card.Header className="centered image" style={{marginTop: 0 }}>
          <Image
        avatar
        floated="left"
        size="large"
        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
      />
          </Card.Header>
          <Card.Content>
            <Label>
              User Name:
            </Label>
            <Form>
              <div className="ui action input fluid">
                <Input
                  type="text"
                  placeholder="username..."
                  name="username"
                  value={user.username}
                  icon="user"
                  iconPosition="left"
                />
                <button
                  type="button"
                  className="ui button teal"
                  // disabled={username.trim() === ""}
                  onClick={() => console.log("test username change")}
                >
                  Update
                </button>
              </div>
            </Form>
          </Card.Content>
          <Card.Content>
            <Label>
              E-mail:
            </Label>
            <Form>
              <div className="ui action input fluid">
                <Input
                  type="text"
                  placeholder="email..."
                  name="email"
                  value={user.email}
                  icon="mail"
                  iconPosition="left"
                />
                <button
                  type="button"
                  className="ui button teal"
                  // disabled={username.trim() === ""}
                  onClick={() => console.log("test email change")}
                >
                  Update
                </button>
              </div>
            </Form>
          </Card.Content>
          {/* <Card.Content>
            <Label>
              Password:
            </Label>
            <Form>
              <div className="ui action input fluid">
                <input
                  type="password"
                  placeholder="password..."
                  name="password"
                  icon="lock"
                />
                <button
                  type="button"
                  className="ui button teal"
                  // disabled={username.trim() === ""}
                  onClick={() => console.log("test url image change")}
                >
                  Change
                </button>
              </div>
            </Form>
          </Card.Content> */}
        </Card>
      )}
      <Card>
        <Card.Content>
          <Label>
            Avatar
          </Label>
          <Form>
            <div className="ui action input fluid">
              <Input
                type="text"
                placeholder="avatar..."
                name="avatar"
                value={user.avatar_url}
                icon="user"
              />
              <button
                type="button"
                className="ui button teal"
                // disabled={avatar.trim() === ""}
                onClick={() => console.log(`${user.avatar_url}`)}
              >
                Update
              </button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
