import React from 'react';
import { Link, withRouter } from 'react-router-dom';

/**
 * This is the app's main navigation bar. The current panel has a white underline.
 * Might Do: Make the current panel's text white and the others gray instead.
 */
const NavBar = props => {
    const currentPanel = props.location.pathname
    return (
        <div className="nav-bar">
            <Link className={`nav-bar-link${currentPanel === "/" ? "-active" : ''}`} to="/">Text</Link>
            <Link className={`nav-bar-link${currentPanel === "/images" ? "-active" : ''}`} to="/images">Images</Link>
            <Link className={`nav-bar-link${currentPanel === "/trending" ? "-active" : ''}`} to="/trending">Swyl'd 'n Crazy</Link>
            <Link className={`nav-bar-link${currentPanel === "/about" ? "-active" : ''}`} to="/about">About</Link>
            <Link className={`nav-bar-link${currentPanel === "/sponsors" ? "-active" : ''}`} to="/sponsors">Sponsors</Link>
            <Link className={`nav-bar-link${currentPanel === "/dashboard" ? "-active" : ''}`} to="/dashboard">Dashboard</Link>
        </div>
    )
}

export default withRouter(NavBar);