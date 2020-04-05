import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault()
        if(password !== password2) {
           setAlert('passwords do not match', 'danger')
        } else {
            register({ name, email, password });
        }
    }

    return (
        <Fragment>
            <h1 className="lg primary-txt">Sign Up</h1>
            <p className="lead">Create an account here</p>
            <form className="form" onSubmit={event => onSubmit(event)}>
                <div className="form-input">
                    <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={event => onChange(event)}
                    name="name"
                    requried />
                </div>
                <div className="form-input">
                    <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={event => onChange(event)}
                    name="email"
                    requried />
                    <small className="form-note">This site uses Gravatar, so if you'd like a profile image use a gravatar email address</small>
                </div>
                <div className="form-input">
                    <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={event => onChange(event)}
                    name="password"
                    requried
                    minLength="4" />
                </div>
                <div className="form-input">
                    <input 
                    type="password" 
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={event => onChange(event)}
                    name="password2"
                    requried
                    minLength="4" />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">Already have an account? <Link to='/login'>Login</Link></p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, register })(Register);
