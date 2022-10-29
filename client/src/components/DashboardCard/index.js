import React, { useContext } from "react";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import { AuthContext } from "../../utils/auth";
export default function DashboardCard({ actionViews, friendCounts, postCounts }) {
  const { user } = useContext(AuthContext);
  if(!user) window.location.assign("/login");
  return (
    <Grid columns={2}>
      {user && (
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="users" size="large" style={{ margin: 0, marginRight: 10}} />
                <div color="blue" id="countfriends">{friendCounts} friends</div>
                <Card.Meta>
                  <Button
                    name="bntuser"
                    color="blue"
                    floated="right"
                    onClick={actionViews}
                  >
                    View
                  </Button>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="list alternate outline" size="large" style={{ margin: 0, marginRight: 10}}  />
                <div color="blue" id="countposts">{postCounts} posts</div>
                <Card.Meta>
                  <Button
                    name="bntviewposts"
                    color="blue"
                    floated="right"
                    onClick={actionViews}
                  >
                    View
                  </Button>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          {/* <Grid.Column>
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
          </Grid.Column> */}
        </Grid.Row>
      )}
    </Grid>
  );
}
