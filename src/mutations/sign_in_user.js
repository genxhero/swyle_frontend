import gql from 'graphql-tag';

const signInUser = gql`
mutation signInUser($email: String!, $password: String!)  {
  signInUser(email: {
   email: $email,
   password: $password
  } ) {
    user{
      id
      username
      email
    }
    token
  }
}`

export default signInUser