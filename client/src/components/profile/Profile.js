import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Wheel from '../layout/Wheel';
import { getProfileById } from '../../actions/profile';
import ProfileHeader from './ProfileHeader';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Github from './Github';

const Profile = ({ getProfileById, profile: {profile, loading}, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            { profile === null || loading 
                ? <Wheel />
                : (
                    <Fragment>
                        <Link to='/profiles' className="btn btn-light">
                            Back
                        </Link>
                        { 
                        auth.isAuthenticated && 
                        auth.loading === false && 
                        auth.user._id === profile.user._id && 
                        (
                        <Link to='/edit-profile' className="btn btn-dark">
                            Edit Profile
                        </Link>
                        )}
                        <div className="profile-grid my-1">
                            <ProfileHeader profile={profile} />
                            <About profile={profile} />
                            <div className="profile-exp bg-white p-2">
                                <h2 className="primary-txt">Experience</h2>
                                {profile.experience.length > 0 ? (<Fragment>
                                    {profile.experience.map(experience => (
                                        <Experience 
                                        key={experience._id} 
                                        experience={experience} 
                                        />
                                    ))}
                                </Fragment>) : (<h4>no experience listed</h4>)}
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <h2 className="primary-txt">Education</h2>
                                {profile.education.length > 0 ? (<Fragment>
                                    {profile.education.map(education => (
                                        <Education 
                                        key={education._id} 
                                        education={education} 
                                        />
                                    ))}
                                </Fragment>) : (<h4>no education listed</h4>)}
                            </div>
                            {profile.githubusername && (
                                <Github username={profile.githubusername} />
                            )}
                        </div>
                    </Fragment> 
                )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
