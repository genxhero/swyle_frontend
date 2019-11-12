/**
 * Mutation to be called when a user clicks the laughing face icon in the Reactions tab.
 * Expected Arguments
 *      postType: string, determines which table the post belongs to (in this case articles or image_posts).
 *      postId:  integer, it's an ID number for a post (Article or ImagePost). Will be come a foreign key on the new Funny
 *      userId:  integer, it's an ID number for a User.
 * 
 * * TODO: Refactor to more generic 'reaction', add a new argument "reactionType" actually it needs a better name than that since
 *       reactionType can also be a GraphQL typing name. "typeOfReaction"? Need to make a new Union as well and then i can get all the reactions
 *       with a single snippet.
 */

import gql from 'graphql-tag'

const createFunny = gql`
mutation createFunny($postType: String!, $userId: Int!, $postId: Int!) { 
        createFunny(postType: $postType, userId: $userId, postId: $postId) {
            id
            laugher{
                id
                username
            }
    }  
}
`;

export default createFunny;