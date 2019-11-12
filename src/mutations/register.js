import gql from 'graphql-tag'

const register = gql`mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(
        username: $username,
        authProvider: {
            email: {
                email: $email,
                password: $password
            }
        }
    ) {
        id
        email
        username
    }
}`

export default register;