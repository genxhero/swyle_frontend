/**
 * Edit form for the body of an article
 */

import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import updateArticleBody from './mutations/update_article_body'
import article from './queries/article';

class ArticleBodyEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: this.props.body,
            id: this.props.id
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        //TODO: Adapt the code below.
        this.bodyEditHeight = document.getElementById("article-body").offsetHeight;
    }

    handleFormChange(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
        });
    }

    render() {

        console.log(this.bodyEditHeight)
        return (
            <div className="edit-body">
                <Mutation mutation={updateArticleBody}
                    update={(cache, { data: { updateArticleBody } }) => {
                    }}
                    refetchQueries={[{ query: article, variables: { id: this.props.id } }]}

                >{(updateArticleBody, loading) =>
                    !loading ? (
                        "..."
                    ) : (
                            <form className="edit-body" onSubmit={event => {
                                event.preventDefault();
                                updateArticleBody({
                                    variables: {
                                        body: this.state.body,
                                        id: this.props.id
                                    }
                                }).then(res => {
                                    this.props.finishEdit("Body");
                                })
                            }}>
                            <textarea className="edit-body-textarea" 
                              type="textarea" 
                              wrap="hard"
                              cols="40"
                              onChange={this.handleFormChange("body")} 
                              value={this.state.body}
                              style={{"height":`${this.bodyEditHeight}px`}}
                            />
                            <span className="edit-save-or-cancel">
                                <input type="submit" value="Save" className="confirm-btn-yes" name="Save" />
                                <button onClick={this.props.cancelEdit} className="confirm-btn-no" name="Body">Cancel</button>
                            </span>
                            </form>
                        )}
                </Mutation>

            </div>
        )
    }
}

export default ArticleBodyEdit;