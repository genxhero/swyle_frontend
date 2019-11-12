/**
 * Mutation to be called when a user clicks the thumbs up icon in the Reactions tab.
 * Expected Arguments
 *      postType: string, determines which table the post belongs to (in this case articles or image_posts).
 *      postId:  integer, it's an ID number for a post (Article or ImagePost). Will be come a foreign key on the new Like
 *      userId:  integer, it's an ID number for a User.
 * 
 * TODO: Refactor to more generic 'reaction', add a new argument "reactionType" actually it needs a better name than that since
 *       reactionType can also be a GraphQL typing name. "typeOfReaction"? Need to make a new Union as well and then i can get all the reactions
 *       with a single snippet.
 */

import gql from 'graphql-tag'

const likePost = gql`
mutation likePost($postType: String!, $userId: Int!, $postId: Int!) { 
        likePost(postType: $postType, userId: $userId, postId: $postId) {
            id
            liker{
                id
                username
            }
    }  
}
`;

export default likePost;