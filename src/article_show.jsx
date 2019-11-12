/**
 * Displays all data for a single article
 */

import React, {Component} from 'react';
import {Query} from 'react-apollo';
import article from './queries/article';
import articles from './queries/articles';
import deleteArticle from './mutations/delete_article';
import  { graphql } from 'react-apollo'
import CommentSection from './comment_section_refactor';
import ArticleBodyEdit from './article_body_edit';
import ArticleTitleEdit from './article_title_edit';
import $ from 'jquery';
import { MdDelete} from 'react-icons/md';
import ConfirmationModal from './confirmation_modal';
import Subscription from './article_subscription';
import Reaction from './reaction';

class ArticleShow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editingBody: false,
            editingTitle: false,
            confirmationOpen: false
        }
        this.cancelEdit = this.cancelEdit.bind(this);
        this.finishEdit = this.finishEdit.bind(this);
        this.editField = this.editField.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal(){
        $('body').css('overflow', 'auto');
        this.setState({confirmationOpen: false})
    }

    openModal() {
        $('body').css('overflow', 'hidden');
        this.setState({ confirmationOpen: true })
    }

    cancelEdit(event) {
        $('body').css('overflow', 'auto');
        this.setState({ [`editing${event.target.name}`]: false })
    }

    finishEdit(field) {
        $('body').css('overflow', 'auto');
        this.setState({ [`editing${field}`]: false })
    }

    editField(event) {
        event.preventDefault();
        this.setState({ [`editing${event.target.id}`]: true });
    }

    deleteArticle(e) {
        e.preventDefault();
        const id = this.props.match.params.articleID
        this.props.mutate({
            variables: { id: parseInt(id) },
            refetchQueries: [{query: articles}]
        }).then(res => {
            this.props.history.push("/");
        })
    }

    render() {
       const argument = parseInt(this.props.match.params.articleID)
        return (
            <Query query={article} variables={{ id: argument}}>
                {({ loading, error, data, subscribeToMore}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                        const article = data.article;
                    return (
                        <div className="article-show-page">
                            <div className="article-section">
                                {data.currentUser && (article.author.id === data.currentUser.id) && 
                                 <MdDelete className="post-delete-btn"  onClick={this.openModal}>DeleteMe</MdDelete>}

                                {!this.state.editingTitle ? 
                                 <h1 className="article-show-title">
                                 
                                    {article.title}

                                     { data.currentUser && (article.author.id === data.currentUser.id) && 
                                      <span className="comment-edit-btn" onClick={this.editField} name="Title" id="Title"/>
                                     }
                                 </h1> 
                                   : 
                                    <ArticleTitleEdit cancelEdit={this.cancelEdit} 
                                    finishEdit={this.finishEdit}  id={article.id} title={article.title}/>
                                    }
                                 <h3>by {article.author.username}</h3>
                                {!this.state.editingBody ? 
                                  <p className="article-show-body" id="article-body">
                                        {data.currentUser && (article.author.id === data.currentUser.id) && 
                                        <span className="comment-edit-btn" onClick={this.editField} 
                                        name="Body" id="Body" />}
                                    {article.body} 
                                  </p> 
                                   : 
                                  <ArticleBodyEdit cancelEdit={this.cancelEdit} finishEdit={this.finishEdit} id={article.id} body={article.body}/> }
                          
                                 <div className="reaction-section">
                                    {
                                        article.reactions.map(reaction => {
                                            return (
                                                <div key={`shutuplint${reaction.type}`}>
                                                    <Reaction 
                                                        postType={"Article"} 
                                                        currentUser={data.currentUser}
                                                        postId={argument} 
                                                        reactionType={reaction.type} 
                                                        users={reaction.users} 
                                                        count={reaction.count} />
                                                </div>

                                            )
                                        })
                                    }
                                    <Reaction
                                        postType={"Article"}
                                        currentUser={data.currentUser}
                                        postId={argument}
                                        reactionType={"smart"}
                                        users={[]}
                                        count={0} />
        
                                </div>    
                                                       
                            </div>

                              <CommentSection type={"Article"} currentUser={data.currentUser} postId={argument} articleAuthorId={article.author.id} comments={article.comments}/>
                            {this.state.confirmationOpen && <ConfirmationModal title={article.title} cancel={this.closeModal} confirm={this.deleteArticle}/>}
                            <Subscription subscribeToMore={subscribeToMore} />
                        </div>
                    )
                }}
            </Query>
        )
    }

}

export default graphql(deleteArticle)(ArticleShow);




// <LikesSection
//     type={"Article"}
//     currentUser={data.currentUser}
//     postId={argument}
//     likers={data.article.likers}
//     numLikes={data.article.likeCount} />  