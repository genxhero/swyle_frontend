/**
 * Image subscription for the index page
 */

import gql from 'graphql-tag';

const ImageSubscription = gql`
subscription ImageSubscription {
   imageAdded {
     id
        title
        image
        count
        likeCount
        created
        author {
            id
            username
        }
   },

    imageUpdated {
     id
        title
        image
        count
        likeCount
        created
        author {
            id
            username
        }
   },
    imageLiked {
     id
        title
        image
        count
        likeCount
        created
        author {
            id
            username
        }
   },
    imageUnliked {
     id
        title
        image
        count
        likeCount
        created
        author {
            id
            username
        }
   },
}`

export default ImageSubscription;