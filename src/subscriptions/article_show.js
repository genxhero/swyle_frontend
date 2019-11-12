/**
 * Article subscription for the show page
 */

import gql from 'graphql-tag';

const ArticleSubscription = gql`
subscription ArticleSubscription {
    
    articleLiked {
            id
            title
            body
            likers
            likeCount
            author {
                id
                username
            }
            reactions
            comments {
              id
              body
              createdAt
              commentor {
                id
                username
              }
            }
  
   },

    articleUnliked {
             id
            title
            body
            likers
            likeCount
            author {
                id
                username
            }
            reactions
            comments {
              id
              body
              createdAt
              commentor {
                id
                username
              }
            }
   }, 

    articleUpdated {
            id
            title
            body
            likers
            likeCount
            author {
                id
                username
            }
            reactions
            comments {
              id
              body
              createdAt
              commentor {
                id
                username
              }
            }
    }
      
}`

export default ArticleSubscription;