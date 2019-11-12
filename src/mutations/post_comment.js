import gql from 'graphql-tag'

const postComment = gql`
mutation postComment($body: String!, $userId: Int!, $postId: Int!, $postType: String!){
  postComment(
    body: $body, 
    userId: $userId, 
    postId: $postId, 
    postType: $postType
  ) {
    commentor {
      username
    }
    createdAt
    body
  }
}
`

export default postComment;