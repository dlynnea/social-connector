import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

    const onSubmit = async event => {
        event.preventDefault()
        login(email, password);
    }

    return (
        <Fragment>
        <h1 className="lg primary-txt">Login</h1>
        <p className="lead">Login Here</p>
        <form className="form">
            <div className="form-input">
                <input 
                type="text" 
                placeholder="Name"
                name="name"
                requried />
            </div>
            <div className="form-input">
                <input 
                type="email" 
                placeholder="Email"
                name="email"
                requried />
            </div>
            <div className="form-input">
                <input 
                type="password" 
                placeholder="Password"
                name="password"
                requried
                minLength="4" />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">Don't have an account? <Link to='/register'>Sign Up</Link></p>
    </Fragment>
    )
}

Login.PropTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, { login })(Login);
