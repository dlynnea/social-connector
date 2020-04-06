import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Wheel from '../layout/Wheel';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { post, loading }}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading 
        ? (<Wheel />)
        : (<Fragment>
            <h1 className="lg primary-txt">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome!
            </p>

            <div className="posts">
                {Posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
        )
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
