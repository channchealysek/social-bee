const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        id:ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query {
        getPosts: [Post]
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
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
    }
`;

module.exports = typeDefs;