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
        <section className="auth-container">
        <h1 className="lg primary-txt">Login</h1>
        <form className="form auth-form" onSubmit={e => onSubmit(e)}>
            <div className="form-input form-element">
                <input 
                className="form-element-field" 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={event => onChange(event)}
                name="email"
                required />
                <div className="form-element-bar"></div>
            <label className="form-element-label">Email</label>
            </div>
            <div className="form-input form-element">
                <input 
                className="form-element-field" 
                type="password" 
                placeholder="Password"
                name="password"
                value={password}
                onChange={event => onChange(event)}
                required
                minLength="6" />
                <div className="form-element-bar"></div>
            <label className="form-element-label">Password</label>
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1 primary-txt">Don't have an account? <Link to='/register'>Sign Up</Link></p>
        </section>
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
