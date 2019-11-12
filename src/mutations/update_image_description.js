import gql from 'graphql-tag';

const updateImageDescription = gql`
    mutation updateImageDescription($id: Int!, $description: String!) {
        updateImageDescription(id: $id, description: $description) {
            id
            description
            title
            image
        }
    }
`;

export default updateImageDescription;