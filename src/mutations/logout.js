import gql from 'graphql-tag';

const logout = gql`
mutation {
  logout {
    email
  }
}`

export default logout;