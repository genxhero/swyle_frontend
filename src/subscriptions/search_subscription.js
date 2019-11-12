/**
 * Subscription that updates search results when a matching post is created.
 */

import gql from 'graphql-tag';

const SearchSubscription = gql`
subscription SearchSubscription {
    imageAdded {
        id
        title
        description
        image
   },
    articleAdded {
        id
        title
        body
        snippet
   },
}
`

export default SearchSubscription;