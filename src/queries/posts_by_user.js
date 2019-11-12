import gql from 'graphql-tag';

/**
 * Fetches all posts by a specific user in order of creation.
 */

const postsByUser = gql`
query postsByUser($userId: Int!){
    postsByUser(userId:$userId) {
    __typename
    ... on Article {
      id
      title
      snippet
    }
    ... on Image {
      id
      title
      image	
    }
  }
}
`

export default postsByUser;