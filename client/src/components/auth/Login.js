import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
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

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
        <h1 className="lg primary-txt">Login</h1>
        <p className="lead">Login Here</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-input">
                <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={event => onChange(event)}
                name="email"
                requried />
            </div>
            <div className="form-input">
                <input 
                type="password" 
                placeholder="Password"
                name="password"
                value={password}
                onChange={event => onChange(event)}
                requried
                minLength="6" />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">Don't have an account? <Link to='/register'>Sign Up</Link></p>
    </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
