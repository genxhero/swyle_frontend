/**
 * Image show subscription, for real time updates while viewing a particular image page.
 */

import gql from 'graphql-tag';

const ImageSubscription = gql`
subscription ImageSubscription {
    
    imageLiked {
            id
            title
            description
            image
            likers
            likeCount
            author {
                id
                username
            }
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

    imageUnliked {
            id
            title
            description
            image
            likers
            likeCount
            author {
                id
                username
            }
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

    imageUpdated {
            id
            title
            description
            image
            likers
            likeCount
            author {
                id
                username
            }
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

export default ImageSubscription;