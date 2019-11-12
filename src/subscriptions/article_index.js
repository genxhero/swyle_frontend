/**
 * Article subscription for the index page
 */

import gql from 'graphql-tag';

const ArticleSubscription = gql`
subscription ArticleSubscription {
   articleAdded {
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
   }
}`

export default ArticleSubscription;