/**
 * updates the Trending page when an article is liked, added, or updated. 
 */

import gql from 'graphql-tag';

const TrendingSubscription = gql`
subscription ArticleSubscription {

    articleLiked {
    id
    title
    snippet
    count
    created
    likeCount
    author {
        id
        username
    }
   },

    articleUnliked {
    id
    title
    snippet
    count
    created
    likeCount
    author {
        id
        username
    }
   
   }, 

    articleUpdated {
    id
    title
    snippet
    count
    created
    likeCount
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

export default TrendingSubscription;