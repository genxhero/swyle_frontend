import React from 'react';

/**
 * 
 * Expected Props
 *      errors: An array of error objects containing a "message" key at the very minimum
 *      clearErrors: A function bound to the parent component which removes errors and changes the state to no longer
 *                   be displaying the modal.  Eg, setErrors(null), this.setState({errors: null})
 */

const ErrorsModal = (props) => {
    return (
        <div className="auth-error-modal">
            <div className="auth-error-message">
                {props.errors.map(error => <span key={error.message + "isthekey"}>{error.message}</span>)}
                <button onClick={props.clearErrors}>OK</button>
            </div>
        </div>
    );
}

export default ErrorsModal;