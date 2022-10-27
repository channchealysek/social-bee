import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../../utils/auth";
import PostForm from "../PostForm";
import PostCard from "../PostCard";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(QUERY_POSTS);
  // ui stackable cards
  return (
    <Grid>
      <Grid.Column width={12}>
        {user && (
          <Grid.Column width={6}>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          <>
            <Grid.Row className="page-title">
              <h1> Recent Posts</h1>
            </Grid.Row>
            <Transition.Group>
              {data.getPosts &&
                data.getPosts.map((post) => (
                    <div className="ui fade visible transition"
                      key={post.id}
                      style={{ marginBottom: 20 }}
                    >
                      <PostCard key={post.id} post={post} />
                    </div>
                ))}
            </Transition.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
