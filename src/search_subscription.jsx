/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars*/
import React, { useEffect } from 'react';
import SearchSubscription from './subscriptions/search_subscription';
import {findMatch} from './helpers';

/**
 * This updates the search page when a post matching the query happens to get created.
 */
const Subscription = ({ subscribeToMore, query}) => {
    useEffect(() => {
        return subscribeToMore({
            document: SearchSubscription,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { imageAdded } = subscriptionData.data;

                if (imageAdded) {
                    const alreadyInList = prev.postsByQuery.find(e => e.id === imageAdded.id && e.__typename === "Image");
                    const match = findMatch(query, imageAdded.description) || findMatch(query, imageAdded.title);

                    if (alreadyInList || !match) {
                        return prev;
                    }
                    return { postsByQuery: [imageAdded].concat(prev.postsByQuery) };
                }

                const { articleAdded } = subscriptionData.data
                if (articleAdded) {
                    const alreadyInList = prev.postsByQuery.find(e => e.id === articleAdded.id && e.__typename === "Article");
                    //TODO get all this regexp stuff in a helper function, and import it.
                    //Specifically, I need to iterate over all the words in the query string and return true when i get a hit.
                    //Testers
                    const match = findMatch(query, articleAdded.body) || findMatch(query, articleAdded.title);
                    if (alreadyInList || !match) {
                        return prev;
                    }
                    return { postsByQuery: [articleAdded].concat(prev.postsByQuery) };
                }
                return prev;
            },
        });
    }, []);
    return null;
};

export default Subscription;