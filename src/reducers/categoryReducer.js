import {
  SET_CATEGORIES,
} from './../actions/categoryActions';

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.categories.categories
      });
    default:
      return state;
  }
};
