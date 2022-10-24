import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_POSTS } from '../../utils/queries'
import { Grid } from "semantic-ui-react";
import PostCard from "../../components/PostCard";

export default function Home() {

const { loading, data:{getPosts: posts} } = useQuery(QUERY_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1> Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}


