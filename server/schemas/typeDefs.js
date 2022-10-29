const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!

    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    friendCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
    getPost(postId: ID!): Post
    getPostByUser(userId: ID!): Post
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    updatePost(postId: ID!, body: String! ): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
