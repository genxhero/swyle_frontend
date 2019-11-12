import gql from 'graphql-tag';

const updateArticleBody = gql`
    mutation updateArticleBody($id: Int!, $body: String!) {
        updateArticleBody(id: $id, body: $body) {
            id
            body
            title
        }
    }
`;

export default updateArticleBody