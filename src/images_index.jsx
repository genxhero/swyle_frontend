import React, { Component } from 'react';
import images from './queries/images';
import { Query } from "react-apollo";
import {Link} from 'react-router-dom';
import Subscription from './images_subscription';

/**
 * Component for displaying all of the images in chronological order.  No analytics, no metrics,
 * no assumptions. Deal with it.
 */
class ImagesIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Query query={images}>
                {({ loading, error, data, subscribeToMore}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return (
                        <div className="image-index-page">
                            <h1>Newest Images</h1>
                            <div className="image-index-spread">
                            {data.images.map(image =>
                                  {return (
                                      <div className="image-index-card" 
                                      key={`${image.title}${image.author.username}`}>
                                          <Link to={`/images/${image.id}`}>
                                           <img className="image-index-thumb"src={image.image} alt={image.title} />
                                          </Link>
                                          <span>by {image.author.username}</span>
                                          <span>{image.count} Comments, {image.likeCount} Likes</span>
                                      </div>
                                  )
                                      
                                  }   
                            )}
                            </div>
                            <Subscription subscribeToMore={subscribeToMore} />
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default ImagesIndex;