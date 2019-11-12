/**
 * Removes an article from the database.
 *    Argument: ID, Integer, it's the id number of the post in question.  Since there are two different mutations, one for Article and one for
 *    ImagePost, a postType isn't required.
 */

import gql from 'graphql-tag'

const deleteArticle = gql`
mutation deleteArticle($id: Int!)
 { deleteArticle(id: $id) {
  id
}
  
}`

export default deleteArticle;