import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        addPost({ text });
        setText('');
    }

    return (
        <div className="post-form">
            <form className="form m-1-3" onSubmit={(event) => onSubmit(event)}>
                <div className="form-element form-input">
                    <textarea 
                        className="form-element-field" 
                        type="input"
                        name="text"
                        placeholder="Share something..."
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        required
                    ></textarea>
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">New Post</label>
                </div>
                <input type="submit" className="btn btn-light my-1" value="Post" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm);
