import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories } from '../actions/categoryActions';
import { getPosts } from '../actions/postActions';
import Category from './Category'

class ListCategories extends Component {
  /*componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }*/
  //console.log('In list categories');
  //console.log(this.props);
  render() {
    const { categories } = this.props;
    const categoriesView = categories && categories.length > 0 && categories.map((category, index) => (
      <div key={index}>
        <Category categoryPath={category.path}/>
      </div>
    ));
    return (
      <div>
        { categoriesView }
      </div>
    );
    /*return (
      <div>
        <ul>
          {categories && categories.length > 0 && categories.map((category, index) => (
            <li key={index}>
              <Link to={`/categories/${category.path}`}>{category.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );*/
  }
}

function mapStateToProps(state) {
  return {
    //categories: state.categories ? state.categories.categories : [],
    //posts: state.posts ? state.posts : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //fetchCategories: () => dispatch(getCategories()),
    //fetchPosts: () => dispatch(getPosts())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCategories));
