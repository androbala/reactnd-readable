import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRecipes } from '../utils/api'
import { capitalize } from '../utils/helpers'
import { withRouter, Link } from 'react-router-dom'

import HomeIcon from 'react-icons/lib/fa/home';
import './App.css';

import ListCategories from './listCategories'
//import CreatePost from './createPost'
import Category from './category'
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
        <Link
          className="appLink"
          to="/"
        ><HomeIcon size={40}/></Link>
        <Route exact path="/" render={() => (
          <div>
            <ListCategories/>
            {/*<CreatePost post="{title: 'test', body: 'test', author: 'test'}"/>*/}
          </div>
        )}/>
        <Route path="/categories/:categoryPath" render={() => (
          <Category />
        )}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
