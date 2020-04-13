import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile, deleteProfile } from '../../actions/profile';
import Wheel from '../layout/Wheel'
import Links from './Links';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getUserProfile, deleteProfile, auth: { user }, profile: {profile, loading} }) => {
    useEffect(() => {
        getUserProfile();
    }, [getUserProfile]);

    return loading && profile === null ? <Wheel /> : <Fragment>
        <h1 className="lg primary-txt">Dashboard</h1>
        <p className="lead">
            Welcome { user && user.name }
        </p>
        {profile !== null 
        ? (<Fragment>
            <Links />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="delete-account my-3">
                <button onClick={() => deleteProfile()} className="btn btn-danger">
                    Delete Account
                </button>
            </div>
        </Fragment>) 
        : (
        <Fragment>
            <p>Click below to set up your profile</p>
            <Link to='/create-profile'className="btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment> 
        )}
    </Fragment>
}

Dashboard.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect
    (mapStateToProps, 
        { getUserProfile, deleteProfile }
    )(Dashboard);
