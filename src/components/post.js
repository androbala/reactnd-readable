import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import Comment from './Comment';
import CommentForm from './CommentForm';
import PostForm from './PostForm';

import { getCommentsByPost } from './../actions/commentActions';
//import { likePost, unlikePost, deletePost } from './../actions/postActions';

class Post extends Component {

  state = {
    sortingCriteria: 'score',
    modalOpenComment: false,
    modalOpenPost: false,
    post: {},
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({sortingCriteria: ev.target.value})
  }

  componentDidMount() {
    if (this.props.match.params.postUuid) {
      this.props.fetchCommentsByPost(this.props.match.params.postUuid)
    }
  }

  getCommentsView = () => {
    const sortingCriteria = this.state.sortingCriteria;
    return this.props.comments.sort((comment1, comment2) => {
      switch (sortingCriteria) {
        case 'score':
          return comment2.voteScore - comment1.voteScore;
        case 'timestamp':
          return comment2.timestamp - comment1.timestamp;
        default:
          return null;
      }
    }).map((comment, index) => (
      <div key={index}>
        <Comment key={index} commentUuid={comment.id}/>
      </div>
    ));
  }

  getPost = () => {
    const { id, body, title, author, timestamp, category } = this.props.post;
    return {
      id,
      author,
      timestamp,
      body,
      title,
      category,
    };
  }

  getPostUuid = () => {
    return this.props.postUuid || this.props.match.params.postUuid;
  }

  likePost = (ev) => {
    ev.preventDefault();
    this.props.likePost(this.getPostUuid());
  }

  unlikePost = (ev) => {
    ev.preventDefault();
    this.props.unlikePost(this.getPostUuid())
  }

  editPost = (ev) => {
    ev.preventDefault();
    this.setState({modalOpen: true})
  }

  closeModalComment = () => {
    this.setState({ modalOpenComment: false})
  }

  closeModalPost = () => {
    this.setState({modalOpenPost: false})
  }

  addCommentHandler = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpenComment: true });
  }

  editPostHandler = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpenPost: true });
  }

  deletePostHandler = (ev) => {
    ev.preventDefault();
    this.props.deletePost(this.props.post.id);
  }

  render() {
    const {body, title, author, timestamp, voteScore} = this.props.post;
    const {showComment, showDetail} = this.props;
    const commentsView = showComment ? this.getCommentsView() : null;
    return (
      <div className="post">
        <div className="post-title">
          <button className="post-title-content" onClick={this.likePost}>Like post</button>
          <button className="post-title-content" onClick={this.unlikePost}>Unlike post</button>
          <Link
            className="postLink"
            to={this.props.linkPost}
          >
            <h3 className="post-title-content">Post {title}</h3>
          </Link>
          <button className="post-title-content" onClick={this.editPostHandler}>Edit post</button>
          <button className="post-title-content" onClick={this.deletePostHandler}>Delete post</button>
          {showDetail
            ? <button className="post-title-content" onClick={this.addCommentHandler}>Add comment</button>
            : null}
        </div>
        <p>Author: {author}</p>
        <p>Vote score: {voteScore}</p>
        <p>Time: {new Date(timestamp).toString()}</p>
        {showDetail
          ? <div>
              <p>Body: {body}</p>
            </div>
          : null}
        {
          <div>
            <label>Order comments </label>
            <select value={this.state.sortingCriteria} onChange={this.onChange} ref="sortingSelector">
              <option value="timestamp">By time</option>
              <option value="score">By score</option>
            </select>
            {commentsView}
          </div>
        }
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpenComment}
          onRequestClose={this.closeModalComment}
          contentLabel='Modal'
        >
          <CommentForm closeForm={this.closeModalComment} isUpdate={false} post={this.getPost()}/>
        </Modal>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpenPost}
          onRequestClose={this.closeModalPost}
          contentLabel='Modal'
        >
          <PostForm closeForm={this.closeModalPost} isUpdate={true} post={this.getPost()}/>
        </Modal>
      </div>
    );
  }

}

function mapStateToProps(state, props) {
  const postUuid = props.postUuid || props.match.params.postUuid;
  const post = state.posts.posts.find(post => post.id === postUuid) || {};
  const comments = state.comments.comments.filter(comment => comment.parentId === postUuid)
  return {
    post: post,
    comments: comments,
    showComment: props.match.params.postUuid !== undefined,
    showDetail: props.match.params.postUuid !== undefined
  }
}

function mapDispatchToProps(dispatch) {
  console.log('into post');
  return {
    fetchCommentsByPost: (postUuid) => dispatch(getCommentsByPost(postUuid)),
    //deletePost: (postUuid) => dispatch(deletePost(postUuid)),
    //unlikePost: (postUuid) => dispatch(unlikePost(postUuid)),
    //likePost: (postUuid) => dispatch(likePost(postUuid))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
