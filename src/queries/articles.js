/**
 * Queries the database for all the articles. No hiding articles based on metrics. Deal with it.
 */

import gql from 'graphql-tag';

const articles = gql`{
    articles{
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

export default articles;