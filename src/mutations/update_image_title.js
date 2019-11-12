import gql from 'graphql-tag';

const updateImageTitle = gql`
    mutation updateImageTitle($id: Int!, $title: String!) {
        updateImageTitle(id: $id, title: $title) {
            id
            description
            title
            image
        }
    }
`;

export default updateImageTitle;