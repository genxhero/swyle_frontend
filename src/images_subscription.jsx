/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import React, { useEffect } from 'react';
import ImageSubscription from './subscriptions/images_index';

/**
 * Subscription function for images, updates the INDEX page when a new image is uploaded
 * 
 */
const Subscription = ({ subscribeToMore }) => {
    useEffect(() => {
        return subscribeToMore({
            document: ImageSubscription,
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

                return prev;
            },
        });
    }, []);
    return null;
};

export default Subscription;