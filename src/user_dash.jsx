/**
 * This is the user dashboard where the current user's recent activity is displayed.
 * Future: Also display recent posts from users that the current user follows.
 */

import React, {Component} from 'react'
import {Query} from 'react-apollo';
import postsByUser from './queries/posts_by_user';
import commentsByUser from './queries/comments_by_user';
import {Redirect, withRouter} from 'react-router-dom';

class UserDash extends Component {

    constructor(props) {
        super(props)
        this.state={currentUser: this.props.currentUser}
    }

    //TODO: Change up the Hooks and make this component functional to appease the snobs.
  componentWillReceiveProps(newProps) {
      if (this.props.currentUser !== newProps.currentUser) {
          this.setState({currentUser: newProps.currentUser})
      }
  }

  render() {
      if (!this.state.currentUser) {
          return (<Redirect to="/login"/>)
      } else {
          return (
              <div className="user-dashboard">
              <div className="user-profile">
          <h3>{this.state.currentUser.username}'s Dashboard</h3>
              </div>

                <div>

                
                  <h2 className="user-recent-message">Your Recent Activity</h2>

                <div className="user-recent-activity">  

                    <div className="user-posts">
                          <h3 style={{ "textAlign": "center", "color":"white"}}> Posts</h3>
                          <Query query={postsByUser} variables={{ userId: this.state.currentUser.id }}>
                              {({ loading, error, data }) => {
                                  if (loading) return <p>Loading...</p>;
                                  if (error) return <p>Error </p>;
                                  console.log("Current User In dash: ", this.state.currentUser)
                                    return (
                                      <div>
                                        {data.postsByUser.map( post => {
                                          return(
                                            <div className="user-posts-card" key={`${post.title}${post.id}`}>
                                                <h3 >{post.title}</h3>
                                                {post.image && <div className="user-posts-thumbnail-container"><img src={post.image} alt={post.image.title} /> </div>}
                                                {post.snippet && <p>{post.snippet}<span style={{"color":"gray"}}>...</span></p>}
                                            </div>
                                            )
                                      })}
                                      </div>
                                    )
                              }}
                          </Query>

                    </div>

                    <div className="user-comments">
                         <h3 style={{ "textAlign": "center", "color": "white"}}> Comments</h3>
                          <Query query={commentsByUser} variables={{ userId: this.state.currentUser.id }}>
                              {({ loading, error, data }) => {
                                  if (loading) return <p>Loading...</p>;
                                  if (error) return <p>Error </p>;
                                  return (
                                      <div>
                                          {data.commentsByUser.map(comment => {
                                              return (
                                                  <div className="user-comments-card" key={`${comment.id}`}>
                                                    <h4>You commented:</h4>
                                                    <p className="user-comments-card-body">"{comment.body}"</p>
                                                    <h5> <span>
                                                          On <span>{comment.post.title}</span> by <span>{comment.post.author.username}</span> 
                                                          <span> at {comment.createdAt}</span>  
                                                      </span> </h5>
                                                  </div>
                                              )
                                          })}
                                      </div>
                                  )
                              }}
                          </Query>
                    </div>

                </div>
            </div>

              </div>
          )
      }
  }
}

export default withRouter(UserDash);