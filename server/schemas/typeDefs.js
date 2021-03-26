
// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: User
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedBooks(bookData: saveBookInput!): User
    removeBook(bookId: String!): User
  }




  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }


  type User {
    _id: ID
    username: String
    password: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  input typeInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }
`;

// export the typeDefs
module.exports = typeDefs;
