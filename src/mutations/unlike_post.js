import gql from 'graphql-tag'

const unlikePost = gql`
mutation unlikePost($postType: String!, $userId: Int!, $postId: Int!) { 
        unlikePost(postType: $postType, userId: $userId, postId: $postId) {
            id
    }  
}
`;

export default unlikePost;