/**
 * Subscription query for comments
 * DEPRECATED: Comments now update as a part of the Post update instead of having their own subscription.
 * This is because deleting a comment was causing an internal server error.
 */

import gql from 'graphql-tag';
import mutation from '../mutations/delete_comment';

const CommentSubscription = gql`
subscription CommentSubscription {
   commentAdded {
    commentor {
      username
      id
    }
    body
    id
    createdAt
   },

    commentUpdated {
      commentor {
      username
      id
    }
    body
    id
    createdAt
   },

   commentDeleted {
      commentor {
      username
      id
    }
    body
    id
    createdAt
   }
}`

export default CommentSubscription;

/**
 * 
 */