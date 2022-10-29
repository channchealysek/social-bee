import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { AuthContext } from "../../utils/auth";
import { Grid, Transition } from "semantic-ui-react";
import FriendCard from "../FriendCard";

export default function AddFriends(friendCounts) {
  const { user } = useContext(AuthContext);
  if (!user) window.location.assign("/");
  const { loading, data } = useQuery(QUERY_USERS);
  return (
    <Grid>
      {loading ? (
        <h1>loading posts...</h1>
      ) : (
        <Grid.Column width={12}>
          <>
            <Grid.Row className="page-title">
              <h1> People & Fiended</h1>
            </Grid.Row>
            <Transition.Group>
              {data.getUsers &&
                data.getUsers.map((_user) => (
                    <div key={_user.id}>
                    <div
                      className="ui fade visible transition"
                      style={{ marginBottom: 20 }}
                    >
                      <FriendCard user={_user} id={_user.id}/>
                    </div>
                  </div>
                  )

                )}
            </Transition.Group>
          </>
        </Grid.Column>
      )}
    </Grid>
  );
}
