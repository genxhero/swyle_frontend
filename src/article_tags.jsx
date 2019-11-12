import React from 'react';

/**
 * 
 * This displays all of the tags belonging to an article.
 * TODO: Change to PostTags
 */
const ArticleTags = (props) => {
    return (
        <span className="article-card-tags">{props.tags.map( tag => <span key={tag}>{`#${tag} `}</span>)}</span>
    )
}

export default ArticleTags;