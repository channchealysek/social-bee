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

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1> Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm>

            </PostForm>
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
