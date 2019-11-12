import React, { useEffect } from 'react';
import TrendingSubscription from './subscriptions/trending_subscription';

/**
 * This is the subscription component for trending articles, using the useEffect hook.
 * TODO: Try to get all Subscriptions in a single component if feasible. 
 * Thoughts: But it doesn't make sense for image posts index to subscribe to articles, does it? so maybe they need to be separate components.
 */
const Subscription = ({ subscribeToMore }) => {
    useEffect(() => {
        return subscribeToMore({
            document: TrendingSubscription,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { imageAdded } = subscriptionData.data;
                if (imageAdded) {
                    const alreadyInList = prev.images.find(e => e.id === imageAdded.id);
                    if (alreadyInList) {
                        return prev;
                    }
                    return { images: [imageAdded].concat(prev.images) };
                }
                const { imageLiked } = subscriptionData.data;

                if (imageLiked) {
                    return {
                        images: prev.images.map(el =>
                            el.id === imageLiked.id ? { ...el, ...imageLiked } : el)
                    }
                }
                const { imageUnliked } = subscriptionData.data
                if (imageUnliked) {
                    return {
                        images: prev.images.map(el =>
                            el.id === imageUnliked.id ? { ...el, ...imageUnliked } : el)
                    }
                }

                const { imageUpdated } = subscriptionData.data;

                if (imageUpdated) {

                    return {
                        images: prev.images.map(el =>
                            el.id === imageUpdated.id ? { ...el, ...imageUpdated } : el)
                    }
                }

                if (articleAdded) {
                    const alreadyInList = prev.articles.find(e => e.id === articleAdded.id);
                    if (alreadyInList) {
                        return prev;
                    }
                    return { articles: [articleAdded].concat(prev.articles) };
                }
                const { articleLiked } = subscriptionData.data;

                if (articleLiked) {
                    return {
                        articles: prev.articles.map(el =>
                            el.id === articleLiked.id ? { ...el, ...articleLiked } : el)
                    }
                }
                const { articleUnliked } = subscriptionData.data
                if (articleUnliked) {
                    return {
                        articles: prev.articles.map(el =>
                            el.id === articleUnliked.id ? { ...el, ...articleUnliked } : el)
                    }
                }

                const { articleUpdated } = subscriptionData.data;

                if (articleUpdated) {

                    return {
                        articles: prev.articles.map(el =>
                            el.id === articleUpdated.id ? { ...el, ...articleUpdated } : el)
                    }
                }


                return prev;
            },
        });
    }, []);
    return null;
};

export default Subscription;