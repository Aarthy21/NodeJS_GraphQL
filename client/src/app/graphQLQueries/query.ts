import gql from "graphql-tag";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      genre
      author {
        name
      }
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
const addAuthorMutation = gql`
  mutation($name: String!, $age:Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, addAuthorMutation };
