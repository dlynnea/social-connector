import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const userLinks = (
        <nav className="navbar-in">
            <h1>
               <Link to='/'>a & c</Link>
            </h1>
        <ul>
            <li>
                 <Link to='/profiles'>
                    PROFILES
                 </Link>
            </li>
            <li>
                 <Link to='/posts'>
                    POSTS
                 </Link>
            </li>
            <li>
                 <Link to='/dashboard'>
                 {/* <i className="fas fa-user"></i>{' '} */}
                 <span className="hide-sm">HOME</span>
                 </Link>
            </li>
            <li>
                <Link to='/'>
                <a onClick={logout} href="#!">
                    {/* <i className="fas fa-sign-out-alt"></i>{' '} */}
                    <span className="hide-sm">LOGOUT</span>
                </a>
                </Link>
            </li>
        </ul>
        </nav>
    )

    const guestLinks = (
        <nav className="navbar">
            <h1>
               <Link to='/'>a & c</Link>
            </h1>
            <ul>
                <li><Link to='/profiles'>PROFILES</Link></li>
                <li><Link to='/register'>REGISTER</Link></li>
                <li><Link to='/login'>LOGIN</Link></li>
            </ul>
        </nav>
    )

    return (
        <>
        {/* <nav className="navbar"> */}
            {/* <h1>
               <Link to='/'>a & c</Link>
            </h1> */}
            { !loading && (<Fragment>{ isAuthenticated ? userLinks : guestLinks }</Fragment>)}
        {/* </nav> */}
        </>
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
