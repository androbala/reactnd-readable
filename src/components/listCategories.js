import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories } from '../actions/categoryActions';
import { getPosts } from '../actions/postActions';
//import Category from './category'

class ListCategories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  render() {
    const { categories } = this.props;
    return (
      <div>
        <ul>
          {categories && categories.length > 0 && categories.map((category, index) => (
            <li key={index}>
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories ? state.categories.categories : [],
    posts: state.posts ? state.posts : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);
