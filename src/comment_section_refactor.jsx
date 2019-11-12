import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import postComment from './mutations/post_comment';
import article from './queries/article';
import image from './queries/image';
import Comment from './comment';

/**
 * Contains user comments belonging to a given post, as well as a form for creating a new comment.
 * 
 * Expected Props
 *      type: String - whether the post is an image or an article
 *      postId: Integer - ID number of the post
 *      comments: Array of objects - The comments themselves.
 */

class CommentSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            body: ""
        }
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
        });
    }

    render() {
        const query = this.props.postType === "Article" ? article : image;
        const comments = this.props.comments;
        return (

                        <div className="comments-section">

                            {this.props.currentUser ?
                                <Mutation mutation={postComment}
                                    update={(cache, { data: { postComment } }) => {
                                    }}
                                    refetchQueries={[{ query: query, variables: { postId: this.props.postId } }]}
                                >
                                    {(postComment, loading) =>
                                        !loading ? (
                                            "..."
                                        ) : (
                                                <form className="comment-add" onSubmit={event => {
                                                    event.preventDefault();
                                                    postComment({
                                                        variables: {
                                                            body: this.state.body,
                                                            userId: this.props.currentUser.id,
                                                            postId: this.props.postId,
                                                            postType: this.props.type
                                                        }
                                                    }).then(res => {
                                                        this.setState({ body: "" })
                                                    })
                                                }}>
                                                    <textarea placeholder="Please Enter your comment here" onChange={this.handleFormChange("body")} value={this.state.body} resize="none" />
                                                    <input className="comment-submit" type="submit" name="Post Comment" value="Post Comment" />
                                                </form>
                                            )
                                    }

                                </Mutation>
                                :
                                <span>Please <Link to="/login">Log In</Link> or <Link to="register">Sign Up</Link> to post comments</span>
                            }
                            <h4 style={{ "marginLeft": "1rem" }}>Latest Comments</h4>
                            {comments.map(
                                (comment, index) => {

                                    const commentStyle = index % 2 === 0 ? { "background": "lightgrey" } : { "background": "white" }
                                    return <Comment
                                        comment={comment}
                                        commentStyle={commentStyle}
                                        currentUser={this.props.currentUser}
                                        articleAuthorId={this.props.articleAuthorId}
                                        postType={this.props.type}
                                        postId={this.props.postId}
                                        key={`SHUT UP, LINT! ${comment.id}`}
                                    />
                                }
                            )}
                        </div>
               
        )
    }
}

export default CommentSection