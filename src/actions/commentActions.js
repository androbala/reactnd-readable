export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment ({ id, parentId, timestamp, body, author, voteScore = 1, deleted = false, parentDeleted = false }) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}
