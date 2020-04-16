import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, deletePost } from '../../actions/post';

const PostItem = ({ addLike, deletePost, auth, showActions, post: { _id, text, name, avatar, user, likes, comments, date }}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">Posted: <Moment format="MM/DD/YYYY">{date}</Moment></p>
                
                {showActions && (
                <Fragment>
                    <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
                    <i class="far fa-heart"></i>
                        <span>{likes.length > 0 && (
                            <span> {likes.length}</span>
                        )}</span>
                    </button>
                    {/* <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                    </button> */}
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                    <i class="far fa-comment"></i> {comments.length > 0 && (
                            <span className="comment-count"> {comments.length}</span>
                        )}
                    </Link>
                    {!auth.loading && user === auth.user._id && (
                    <button onClick={(event) => deletePost(_id)} type="button" className="btn btn-danger">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    )}
                </Fragment>
                )}
            </div>
        </div>
    )
};

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, deletePost })(PostItem);
