import * as api from './../utils/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';
//export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories: categories
});

export const getCategories = () => dispatch => (
  api.getCategories().then(categories => dispatch(setCategories(categories)))
)
