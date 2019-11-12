import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import updateArticleTitle from './mutations/update_article_title'
import article from './queries/article';

/**
 * Component for editing the title of an article.
 * TODO: Merge with image_title_edit, conditionally mutate based on post type
 */
class ArticleTitleEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            id: this.props.id
        }
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
        });
    }

    render() {
        return (
            <div className="edit-title">
                <Mutation mutation={updateArticleTitle}
                    update={(cache, { data: { updateArticleTitle } }) => {
                    }}
                    refetchQueries={[{ query: article, variables: { id: this.props.id} }]}
                
                >{(updateArticleTitle, loading) =>
                    !loading ? (
                        "..."
                    ) : ( 
                    <form className="edit-title" onSubmit={event => {
                            event.preventDefault();
                            updateArticleTitle({
                                variables: {
                                    title: this.state.title,
                                    id: this.props.id
                                }
                            }).then(res => {
                                this.props.finishEdit("Title");
                            })
                        }}>
                            <input className="edit-title-text" type="text" value={this.state.title} onChange={this.handleFormChange("title")}></input>
                            <span className="edit-save-or-cancel">
                                <input type="submit" value="Save"className="confirm-btn-yes" name="Save" />
                                <button onClick={this.props.cancelEdit} className="confirm-btn-no" name="Title">Cancel</button>
                            </span>
                        </form>
                    )}
                </Mutation>
            
            </div>
        )
    }
}

export default ArticleTitleEdit;