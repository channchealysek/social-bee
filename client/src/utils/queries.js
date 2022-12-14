import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const QUERY_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query {
    getUsers {
      id
      username
      email
      createdAt
      friendCount
      friends {
        id
        username
        createdAt
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
query getUserById($userId: ID!) {
  getUserById(userId: $userId) {
    id
    friendCount
  }
}
`;
