/** 
 * Renders form for creating a new article
 */

import React, { Component } from 'react';
import postArticle from './mutations/post_article';
import currentUser from './queries/current_user';
import articles from './queries/articles';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {Redirect} from 'react-router-dom';

class ArticleCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: ""
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.save = this.save.bind(this)
    }


    handleFormChange(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
        });
    }

    async save(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title,
                body: this.state.body,
            },
            refetchQueries: [{query: articles}]
        }).then(res => {
            this.props.history.push(`/articles/${res.data.createArticle.id}`)
        })
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading</p>
        }
        if (!this.props.data.currentUser) {
            return <Redirect to="/login" />
        }
        return (
            <div className="article-create-page">
                <form className="article-create-form"onSubmit={this.save}>
                    <input className="article-create-title" type="text" onChange={this.handleFormChange("title")} placeholder="Article Title" value={this.state.title} />
                    <textarea className="article-create-body" type="text" onChange={this.handleFormChange("body")} placeholder="Write your article here" value={this.state.description} />
                    <input type="submit" className="submit" value="Post Article" disabled={!this.state.body} />
                </form>
            </div>
        )
    }
}



export default compose(
    graphql(currentUser)
)(
    graphql(postArticle)(ArticleCreate)
)