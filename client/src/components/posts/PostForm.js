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
            {/* <div className="bg-primary p">
            </div> */}
            <form className="form my-1" onSubmit={(event) => onSubmit(event)}>
                <textarea 
                name="text"
                cols="10"
                rows="6"
                placeholder="Share something..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm);
