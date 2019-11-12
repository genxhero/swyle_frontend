/**
 * Removes a funny from the database, reducing the funny count of a given post by 1.
 * 
 * Arguments
 *      postType: String, used to determine what kind of post is being unfunnied.
 *      postId: Integer, foreign key on the Funny - that which is no longer funny.
 *      userId: Integer, foreign key on the Funny - who is no longer laughing
 */


import gql from 'graphql-tag'

const deleteFunny = gql`
mutation deleteFunny($postType: String!, $userId: Int!, $postId: Int!) { 
        deleteFunny(postType: $postType, userId: $userId, postId: $postId) {
            id
    }  
}
`;

export default deleteFunny;