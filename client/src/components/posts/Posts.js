import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Wheel from '../layout/Wheel';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading }}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading 
        ? (<Wheel />)
        : (<Fragment>
            <div className="bg-primary p">
                <h1 className="lg primary-txt">Posts</h1>
                <h3>Write your post here</h3>
            </div>
            <PostForm />
            <div className="posts">
                {posts.map(post => (
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
