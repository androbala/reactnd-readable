import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRecipes } from '../utils/api'
import { capitalize } from '../utils/helpers'
import './App.css';

import ListCategories from './listCategories'
import CreatePost from './createPost'
//import { getCategories } from '../actions/categoryActions';

class App extends Component {
  /*componentDidMount() {
    this.props.fetchCategories();
  }*/
  render() {
    //const { categories } = this.props;
    //const categories = ['name': 'category 1'];
    return (
      <div className="App">
          <ListCategories/>
          <CreatePost post="{title: 'test', body: 'test', author: 'test'}"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //categories: state.categories ? state.categories : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //fetchCategories: () => dispatch(getCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
