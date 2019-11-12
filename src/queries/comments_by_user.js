/**
 * Fetches all comments belonging to a specific user, generally the current user but will work for any user given a valid ID.
 */

import gql from "graphql-tag"

const comments = gql`
query commentsByUser($userId: Int!){
    commentsByUser(userId: $userId) {
    body
    id
    createdAt
    post{
      __typename
      ... on Article {
        title
          author {
          username
        }
      }
      ... on Image {
        title
        author {
          username
        }
      }
    }
  }
}
`

export default comments;