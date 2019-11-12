/**
 * Fetches the user currently logged in, can be reused in just about any back end as long as the fields happen to be the same.
 */

import gql from 'graphql-tag';

const currentUser = gql`{
    currentUser {
    id
    email
    username
    }
}`

export default currentUser