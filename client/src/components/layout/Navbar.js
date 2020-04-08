import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const userLinks = (
        <ul>
            <li>
                 <Link to='/profiles'>
                    Profiles
                 </Link>
            </li>
            <li>
                 <Link to='/posts'>
                    Posts
                 </Link>
            </li>
            <li>
                 <Link to='/dashboard'>
                 <i className="fas fa-user"></i>{' '}
                 <span className="hide-sm">Home</span>
                 </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to='/profiles'>Profiles</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar">
            <h1>
               <Link to='/'>a & c</Link>
            </h1>
            { !loading && (<Fragment>{ isAuthenticated ? userLinks : guestLinks }</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
