import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import updateImageDescription from './mutations/update_image_description';
import image from './queries/image';

/**
 * Form for editing the description of an image.
 * TODO: Replace with functional version using hooks
 */

class ImageDescriptionEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: this.props.description,
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
                <Mutation mutation={updateImageDescription}
                    update={(cache, { data: { updateImageDescription } }) => {
                    }}
                    refetchQueries={[{ query: image, variables: { id: this.props.id } }]}

                >{(updateImageDescription, loading) =>
                    !loading ? (
                        "..."
                    ) : (
                            <form className="edit-description" onSubmit={event => {
                                event.preventDefault();
                                    updateImageDescription({
                                    variables: {
                                        description: this.state.description,
                                        id: this.props.id
                                    }
                                }).then(res => {
                                    this.props.finishEdit("Description");
                                })
                            }}>
                                <input className="edit-description-text" type="text" value={this.state.description} onChange={this.handleFormChange("description")}></input>
                                <span className="edit-save-or-cancel">
                                    <input type="submit" value="Save" className="confirm-btn-yes" name="Save" />
                                    <button onClick={this.props.cancelEdit} className="confirm-btn-no" name="Description">Cancel</button>
                                </span>
                            </form>
                        )}
                </Mutation>

            </div>
        )
    }
}

export default ImageDescriptionEdit;