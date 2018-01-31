import {
  ADD_COMMENT,
} from './../actions/commentActions'

export default (state = {comments: []}, action) => {
  //const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = action
  switch (action.type) {
    case ADD_COMMENT :
      return Object.assign({}, state, {
        comments: action.comments
      });
    default :
      return state
  }
}
