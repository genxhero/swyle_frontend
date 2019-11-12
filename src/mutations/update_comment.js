import gql from 'graphql-tag'

const updateComment = gql`
mutation updateComment($id: Int!, $body: String!, $postType: String!){
  updateComment(id: $id, body:$body, postType: $postType) {
    body
    id
  }
}
`

export default updateComment;