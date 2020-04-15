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
                    <h1 className="xl">Dot Join</h1>
                    {/* <small>[ A JOIN is a means for combining columns (people) from one or more tables (backgrounds) by using values (interests) common to each ]</small> */}
                    {/* <p className="lead">Create a profile where you can share posts, share ideas and get help from those you connect with.</p> */}
                    <p className="lead">A JOIN is a means for combining columns (people) from one or more tables (backgrounds) by using values (interests) common to each</p>
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
