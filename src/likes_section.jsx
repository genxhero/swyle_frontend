import React, {Component} from 'react';
import { MdThumbUp} from 'react-icons/md';
import {Mutation} from 'react-apollo';
import likePost from './mutations/like_post';
import article from './queries/article';
import image from './queries/image';
import unlikePost from './mutations/unlike_post';

const QUERIES = {"Article": article, "ImagePost": image};

/**
 * To Be Deprecated for a Reactions Section once it is completed.
 */

class LikesSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser
        }
    }


    componentWillReceiveProps(newProps) {
        if (this.props.currentUser !== newProps.currentUser) {
            this.setState({currentUser: newProps.currentUser})
        }
    }

    render() {
        const userLikesIt = this.state.currentUser && this.props.likers.includes(this.state.currentUser.id);
        const refetch = QUERIES[this.props.type]
        return (
            <div className="likes-section" style={{"color":"white"}}>
                <div className="like-or-dislike">
                       {  userLikesIt ?
                        <Mutation
                            mutation={unlikePost}
                            refetchQueries={[{ query: refetch, variables: { id: this.props.postId, } }]}
                            update={(cache, { data: { unlikePost } }) => {
                            }}>
                            {(unlikePost, loading) =>
                                !loading ? (
                                    "..."
                                ) : (
                                        <span>
                                            <MdThumbUp className="like-thumb-yes"
                                                onClick={event => {
                                                    event.preventDefault();
                                                    if (!this.state.currentUser) {
                                                        return false;
                                                    }
                                                    unlikePost({
                                                        variables: {
                                                            userId: this.state.currentUser.id,
                                                            postId: this.props.postId,
                                                            postType: this.props.type
                                                        }
                                                    }).then(res => {
                                                        // this.setState({ body: "" })
                                                    })

                                                }}
                                            />
                                            {this.props.numLikes}
                                        </span>
                                    )}
                        </Mutation>
                           :                    
                        <Mutation 
                            mutation={likePost}
                        refetchQueries={[{ query: refetch, variables: { id: this.props.postId,}}]}
                            update={(cache, { data: { likePost } }) => {
                            }}>
                            {(likePost, loading) =>
                                !loading ? (
                                    "..."
                                ) : (
                                <span> 
                                  <MdThumbUp className="like-thumb-no" 
                                            onClick={event => {
                                                event.preventDefault();
                                                if (!this.state.currentUser) {
                                                    alert("Must be logged in to like")
                                                    return false;
                                                }
                                                likePost({
                                                    variables: {
                                                        userId: this.state.currentUser.id,
                                                        postId: this.props.postId,
                                                        postType: this.props.type
                                                    }
                                                }).then(res => {
                                                    // this.setState({ body: "" })
                                                })
                                           
                                            }}
                                  /> 
                                  {this.props.numLikes}
                                </span>
                                )}     
                        </Mutation>
                       }
                </div>
            </div>
        )
    }
}

export default LikesSection;