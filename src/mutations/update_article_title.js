import gql from 'graphql-tag';

const updateArticleTitle = gql`
    mutation updateArticleTitle($id: Int!, $title: String!) {
        updateArticleTitle(id: $id, title: $title) {
            id
            body
            title
        }
    }
`;

export default updateArticleTitle;