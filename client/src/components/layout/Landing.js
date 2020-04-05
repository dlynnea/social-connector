import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    };

    return (
        <section className="landing">
            <div className="overlay">
                <div className="inside-landing">
                    <h1 className="xl">Social Connector</h1>
                    <p className="lead">Create a dev profile where you can share posts and get help from those you connect with.</p>
                    <div className="buttons">
                        <Link className="btn btn-primary" to='/register'>Sign Up</Link>
                        <Link className="btn btn-light" to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
