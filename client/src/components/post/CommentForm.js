import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        addComment(postId, { text });
        setText('');
    }

    return (
        <div className="comment-form">
            <form className="form m-1-2" onSubmit={(event) => onSubmit(event)}>
                <div className="form-element">
                    <textarea 
                        className="form-element-field" 
                        name="text"
                        rows="2"
                        placeholder="Comment.."
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        required
                    ></textarea>
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">Leave a Comment</label>
                </div>
                <input type="submit" className="btn btn-light my-1" value="Post" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm);
