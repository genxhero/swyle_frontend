/**
 * Queries for all comments belonging to a given post.
 * Expects two arguments:
 *    postId: Integer - ID number of the post in question pulled from the url wildcard
 *    postType: String - should match the name of a model on the database, e.g., Article
 */

import gql from "graphql-tag"

const comments = gql`
query commentsByPost($postId: Int!, $postType: String!){
  commentsByPost(postId: $postId, postType: $postType) {
    commentor {
      username
      id
    }
    body
    id
    createdAt
  }
}
`

export default comments;