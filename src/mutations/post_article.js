import gql from 'graphql-tag'

const postArticle = gql`
  mutation createArticle($title: String!, $body: String!) {
    createArticle(body: $body, title: $title) {
      title
      id
      body
      author {
        id
        username
      }
    }
  }
`;

export default postArticle;