/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import React, { useEffect } from 'react';
import ImageSubscription from './subscriptions/image_show';


const Subscription = ({ subscribeToMore }) => {
    useEffect(() => {
        return subscribeToMore({
            document: ImageSubscription,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const { imageLiked } = subscriptionData.data;

                if (imageLiked) {
                    return {
                        image: imageLiked
                    }
                }
                const { imageUnliked } = subscriptionData.data
                if (imageUnliked) {
                    return {
                        image: imageUnliked
                    }
                }

                const { imageUpdated } = subscriptionData.data;

                if (imageUpdated) {
                    return {
                        image: imageUpdated
                    }
                }

                return prev;
            },
        });
    }, []);
    return null;
};

export default Subscription;