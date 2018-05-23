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
      id
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
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  addAuthorMutation,
  getBookQuery
};
