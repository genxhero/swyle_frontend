/**
 * Removes an ImagePost from the database.
 *    Argument: ID, Integer, it's the id number of the post in question.  Since there are two different mutations, one for Article and one for
 *    ImagePost, a postType isn't required.
 * 
 * TODO: Figure out how to remove previously uploaded images from AWS S3 Bucket
 */

import gql from 'graphql-tag'

const deleteImage = gql`
mutation deleteImage($id: Int!)
 { deleteImage(id: $id) {
  id
}
  
}`

export default deleteImage;