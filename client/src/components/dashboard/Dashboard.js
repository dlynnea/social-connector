import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profile';
import Wheel from '../layout/Wheel'

const Dashboard = ({ getUserProfile, auth: { user }, profile: {profile, loading} }) => {
    useEffect(() => {
        getUserProfile();
    }, []);

    return loading && profile === null ? <Wheel /> : <Fragment>
        <h1 className="lg primary-txt">Dashboard</h1>
        <p className="lead">
            Welcome { user && user.name }
        </p>
        {profile !== null 
        ? (<Fragment>profile</Fragment>) 
        : (
        <Fragment>
            <p>You currently have no profile, go ahead and set one up here:</p>
            <Link to='/create-profile'className="btn btn-primary my-1">
                Create a Profile
            </Link>
        </Fragment> 
        )}
    </Fragment>
}

Dashboard.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getUserProfile })(Dashboard);
