import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_POSTS } from "../../utils/queries";
import { Grid } from "semantic-ui-react";
import { AuthContext } from "../../utils/auth";
import PostForm from '../PostForm';
import PostCard from "../PostCard";

export default function Home() {

  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(QUERY_POSTS);
// ui stackable cards
  return (
    <Grid className="ui three column grid">
      <Grid.Row className="page-title">
        <h1> Recent Posts</h1>
      </Grid.Row>
      <Grid.Row className="ui stackable cards ">
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
