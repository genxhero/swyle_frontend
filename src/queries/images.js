/**
 * Fetches all of the images.
 * TODO: Pagination and lazy loading.
 */

import gql from 'graphql-tag';

const images = gql`{
    images{
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
    }
}`

export default images;