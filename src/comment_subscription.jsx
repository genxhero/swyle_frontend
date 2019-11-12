/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import React, { useEffect } from 'react';
import CommentSubscription from './subscriptions/comment_subscription';


/**
 * DEPRECATED, do not use unless someone figures out how to fix the bug with deletion
 * Add and Edit subscriptions work, but when you try to delete it throws a 500 server error.
 * Upon deletion GraphQL tries to re-query for the deleted comment and causes a failure.
 */

const Subscription = ({ subscribeToMore }) => {
    useEffect(() => {
        return subscribeToMore({
            document: CommentSubscription,
            updateQuery: (prev, { subscriptionData }) => {
                console.log("subdata:", subscriptionData)
                if (!subscriptionData.data) return prev;

                const { commentAdded } = subscriptionData.data;
                
                if (commentAdded) {
                    const alreadyInList = prev.commentsByPost.find(e => e.id === commentAdded.id);
                    if (alreadyInList) {
                        return prev;
                    }
                    return { commentsByPost: [commentAdded].concat(prev.commentsByPost) };
                }

                const { commentUpdated } = subscriptionData.data;
                if (commentUpdated) {
                    return {
                        commentsByPost: prev.commentsByPost.map(el =>
                            el.id === commentUpdated.id ? { ...el, ...commentUpdated } : el)
                    }
                }
                
                // const {commentDeleted} = subscriptionData.data;
                // debugger
                // if (commentDeleted) {
                //     debugger;
                //     return {
                //         commentsByPost: prev.commentsByPost.map(el =>
                //             el.id === commentDeleted.id ? { } : el)
                //     }
                // }

                return prev;
            },
        });
    }, []);
    return null;
};

export default Subscription;