import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import { AuthContext } from "../../utils/auth";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../PostCard";

export default function UserPosts() {
  const { user } = useContext(AuthContext);
  if(!user) window.location.assign("/");
  const { loading, data } = useQuery(QUERY_POSTS);
  return (
    <Grid>
      {loading ? (
        <h1>loading posts...</h1>
      ) : (
        <Grid.Column width={12}>
          <>
            <Grid.Row className="page-title">
              <h1> All Posts</h1>
            </Grid.Row>
            <Transition.Group>
              {data.getPosts &&
                data.getPosts.map(
                  (post) =>
                    user.username === post.username && (
                      <div key={post.id}>
                        <div   
                          className="ui fade visible transition"
                          style={{ marginBottom: 20 }}
                        >
                          <PostCard post={post} />
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
