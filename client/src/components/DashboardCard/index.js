import React, { useContext } from "react";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import { AuthContext } from "../../utils/auth";
export default function DashboardCard({ actionViews }) {
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3}>
      {user && (
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="users" style={{ margin: 0 }} />
                <Card.Meta>
                  <Button
                    name="bntuser"
                    color="blue"
                    floated="right"
                    onClick={actionViews}
                  >
                    View Friend
                  </Button>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="list alternate outline" style={{ margin: 0 }} />
                <Card.Meta>
                  <Button
                    name="bntviewposts"
                    color="blue"
                    floated="right"
                    onClick={actionViews}
                  >
                    View Posts
                  </Button>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="globe" style={{ margin: 0 }} />
                <Card.Meta>
                  <Button
                    name="bntstore"
                    color="grey"
                    floated="right"
                    onClick={actionViews}
                  >
                    View Store
                  </Button>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}
