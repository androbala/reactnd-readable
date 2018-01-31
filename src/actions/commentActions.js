import * as api from './../utils/api';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';

export const addComment = (comment) => dispatch => (
  api.addCommentToPost(comment).then(() => {
    api.getCommentsByPost(comment.parentId).then(comments => {
      dispatch(addCommentSuccess(comments));
    });
  })
)

export function addCommentSuccess(comments) {
  return {
    type: ADD_COMMENT,
    comments: comments
  }
}

export const getCommentsByPost = (postId) => dispatch => (
  api.getCommentsByPost(postId).then(comments => dispatch(getCommentsSuccess(comments)))
)

export function getCommentsSuccess(comments) {
  return {
    type: GET_COMMENTS_BY_POST,
    comments: comments
  }
}
