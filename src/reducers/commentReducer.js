import {
  ADD_COMMENT,
} from './../actions/commentActions'

export default (state = {comments: []}, action) => {
  const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = action
  switch (action.type) {
    case ADD_COMMENT :
      return {
        ...state,
        [id]: {
          [parentId]: parentId,
          [body]: body,
          [author]: author,
          [voteScore]: voteScore,
          [timestamp]: timestamp,
          [deleted]: deleted,
          [parentDeleted]: parentDeleted,
        }
      }
    default :
      return state
  }
}
