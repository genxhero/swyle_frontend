/**
 * TODO: Split this into different modules
 */
import './App.css';
import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo"
import ArticlesIndex from './articles_index';
import ImagesIndex from './images_index';
import ImageCreate from './image_create';
import ImageShow from './image_show';
import ArticleShow from './article_show';
import ArticleCreate from './article_create';
import Header from './header';
import UserDash from './user_dash'
import Login from './login';
import Register from './register';
import Search from './search';
import Trending from './trending';
import About from './about';
import Adverts from './adverts';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import {Query} from 'react-apollo';
import currentUser from './queries/current_user';
import { createCache, createClient } from './utils/apollo';


const history = createHashHistory();

const client = createClient(createCache());

const testArea = () => {
  return <div />
}

class App extends Component {

  render() {   
    return (
      <BrowserRouter history={history}>
        <ApolloProvider client={client}>
          <Query query={currentUser}> 
            {({data, loading })=> {
            if (loading) return <p/>
            debugger;
            return (
            <div>
              <Header currentUser={data.currentUser}/>
               <Switch>
                  <Route exact path="/" component={ArticlesIndex} />
                  <Route exact path={"/articles/new"} component={ArticleCreate} />
                  <Route exact path={"/articles/:articleID"} component={ArticleShow}/>

                  <Route exact path="/images/new" component={ImageCreate} />
                  <Route exact path={"/images/:imageID"} component={ImageShow} />
                  <Route exact path="/images" component={ImagesIndex} />

                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />

                  <Route exact path="/dashboard" render={(props) => <UserDash currentUser={data.currentUser}/>} />

                  <Route exact path="/trending" component={Trending} />
                  <Route exact path="/headertest" component={testArea}/>
                  <Route exact path="/about" component={About} />
                  <Route path="/search" component={Search} />
                  <Route exact path="/sponsors" component={Adverts} />
              </Switch>
          </div> 
            )
        }}
          
          </Query>
        </ApolloProvider>
      </BrowserRouter>

    )
   
  }
}


export default App;
