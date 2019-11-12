import gql from 'graphql-tag';

/**
 * This is used for searching.  User enters a search query into the search bar, it becomes the searchQuery argument, and 
 * then Rails does its business.
 */

const search = gql`
query postsByQuery($searchQuery: String!){
    postsByQuery(searchQuery: $searchQuery) {
    __typename
    ... on Article {
      id
      title
      snippet
    }
    ... on Image {
      id
      title
      image	
    }
  }
}
`;

export default search;