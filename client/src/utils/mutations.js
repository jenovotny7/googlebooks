import gql from "graphql-tag";

export const LOGIN_U = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_U = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_NOVEL = gql`
  mutation savedBooks($bookData: inputType!) {
    savedBooks(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
          description
          bookId
          image
          link
          title
      }
    }
  }
`;

export const REMOVE_NOVEL = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;