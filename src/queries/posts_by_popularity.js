/**
 * Queries database for ImagePosts and Articles with the most likes and comments.
 * No complicated analytics algorithms, just the most commented on and liked fair and plain.
 */

import gql from 'graphql-tag';

const postsByPopularity = gql`
{
    postsByPopularity {
    __typename
    ... on Article {
      id
      title
      snippet
      count
      likeCount
    }
    ... on Image {
      id
      title
      image	
      count
      likeCount
    }
}
}
`

export default postsByPopularity;