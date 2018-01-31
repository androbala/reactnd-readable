import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRecipes } from '../utils/api'
import { capitalize } from '../utils/helpers'
import { withRouter, Link } from 'react-router-dom'

import HomeIcon from 'react-icons/lib/fa/home';
import './App.css';

import ListCategories from './ListCategories'
//import CreatePost from './createPost'
import Category from './Category'
import Post from './Post'
import { getCategories } from '../actions/categoryActions';
import { getPosts } from '../actions/postActions';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  render() {
    const { categories } = this.props;
    //const categories = ['name': 'category 1'];
    return (
      <div className="App">
        <Link
          className="appLink"
          to="/"
        ><HomeIcon size={40}/></Link>
        <Route exact path="/" render={() => (
          <div>
            <ListCategories categories={categories}/>
            {/*<CreatePost post="{title: 'test', body: 'test', author: 'test'}"/>*/}
          </div>
        )}/>
        <Route path="/categories/:categoryPath" render={() => (
          <Category />
        )}/>
        <Route path="/categories/:categoryUuid/posts/:postUuid" render={({ match }) => (
          <Post linkPost={"/categories/" + match.params.categoryUuid + "/posts/" + match.params.postUuid }/>
        )}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories ? state.categories.categories : [],
    //posts: state.posts ? state.posts : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
