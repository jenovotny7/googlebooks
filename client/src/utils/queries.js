import gql from "graphql-tag";



//User GET
export const GET_ME = gql`
{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
          title
          authors
          description
          image
          link
          bookId
      }
      }
    }
`;