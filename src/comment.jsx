import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import comments from './queries/comments_by_post';
import deleteComment from './mutations/delete_comment';
import CommentEdit from './comment_edit';

/**
 * Displays the body, user, and time stamps of a single comment.
 * 
 * TODO: Convert to const format with useState React hook
 */


class Comment extends Component {

    constructor(props){
        super(props);
        this.state = {
            editing: false,
            confirmationOpen: false,
            top: "0"
        }

        this.cancelEdit = this.cancelEdit.bind(this)
        this.editComment = this.editComment.bind(this);
        this.openConfirmationModal = this.openConfirmationModal.bind(this)
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    editComment () {
        this.setState({editing: true})
    }

    cancelEdit () {
        this.setState({editing: false})
    }

    openConfirmationModal (event) {
        event.preventDefault();
        const theComment = document.getElementById(`the-comment${this.props.comment.id}`);
        let top = "0";
        if (theComment.offsetHeight < 120) {
            top = "-1.5rem"
        }
        this.setState(() => { return { confirmationOpen: true, top} })
    }

    closeConfirmationModal(event) {
        event.preventDefault();
        this.setState(() => { return { confirmationOpen: false } })
    }

    deleteComment(event) {
        this.props.mutate({
            variables: { id: this.props.comment.id },
            refetchQueries: [{ query: comments, variables:{ postId: this.props.postId, postType: this.props.postType} }]
        })
    }

    render() {
        if (this.state.editing) {
            return < CommentEdit comment={this.props.comment} cancelEdit={this.cancelEdit} postId={this.props.postId} postType={this.props.postType}/>
        } else {
            
            return (
                <div id={`the-comment${this.props.comment.id}`} key={this.props.comment.body} className="comment" style={this.props.commentStyle}>
                    <div style={{ "display": "flex", "flexDirection": "column" }}>
                        <p className="comment-body">{this.props.comment.body}</p>
                        <span className="comment-who-and-when"> {`${this.props.comment.commentor.username}, on ${this.props.comment.createdAt}`}</span>
                    </div>
                    <div className="comment-buttons">
                        {this.props.currentUser && ( (this.props.currentUser.id === this.props.comment.commentor.id)) && <span className="comment-edit-btn" onClick={this.editComment}/>}
                        {this.props.currentUser &&  ((this.props.currentUser.id === this.props.comment.commentor.id) || this.props.currentUser.id === this.props.articleAuthorId) && <span className="comment-delete-btn" onClick={this.openConfirmationModal} />}
                        {this.state.confirmationOpen && (
                            <div className="confirmation-modal" style={{"top":`${this.state.top}`}}>
                                <div className="confirmation-dialog">
                                    <h4>Remove Comment?</h4>
                                    <div style={{ "display": "flex", "justifyContent": "center" }}>
                                        <button className="confirm-btn-yes" onClick={this.deleteComment} value={this.props.comment.id}>Yes</button>
                                        <button className="confirm-btn-no" onClick={this.closeConfirmationModal}>No</button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )
        }
    }

}

export default graphql(deleteComment)(Comment);