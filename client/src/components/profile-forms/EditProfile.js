import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getUserProfile } from '../../actions/profile';

const EditProfile = ({ createProfile, getUserProfile, profile: {profile, loading}, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const [socialInputs, toggleSocialInputs] = useState(false);
    
    useEffect(() => {
        getUserProfile();
        setFormData({
            company: loading || !profile.company ? ' ' : profile.company, 
            website: loading || !profile.website ? ' ' : profile.website, 
            location: loading || !profile.location ? ' ' : profile.location, 
            status: loading || !profile.status ? ' ' : profile.status, 
            skills: loading || !profile.skills ? ' ' : profile.skills, 
            githubusername: loading || !profile.githubusername ? ' ' : profile.githubusername, 
            bio: loading || !profile.bio ? ' ' : profile.bio, 
            twitter: loading || !profile.social ? ' ' : profile.social.twitter, 
            facebook: loading || !profile.social ? ' ' : profile.social.facebook, 
            linkedin: loading || !profile.social ? ' ' : profile.social.linkedin, 
            youtube: loading || !profile.social ? ' ' : profile.social.youtube, 
            instagram: loading || !profile.social ? ' ' : profile.social.instagram, 
        });
    }, [loading, getUserProfile]);

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
            <h1 className="lg primary-txt">Create Your Profile</h1>
            <p className="lead">some other text here</p>
            <small>* = required field</small>
            <form className="form" onSubmit={(event) => onSubmit(event)}>
                <div className="form-input">
                    <select name="status" value={status} onChange={(event) => onChange(event)}>
                        <option value="">Select a Profession</option>
                        <option value="junior developer">junior developer</option>
                        <option value="senior developer">senior developer</option>
                        <option value="dev ops">dev ops</option>
                        <option value="something else">something else</option>
                        <option value="cat">cat</option>
                        <option value="something">something</option>
                    </select>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={(event) => onChange(event)}/>
                    <small className="form-note">Your Company</small>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={(event) => onChange(event)}/>
                    <small className="form-note">Have a website?</small>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(event) => onChange(event)}/>
                    <small className="form-note">Ex: Portland, OR</small>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Skills" name="skills" value={skills} onChange={(event) => onChange(event)}/>
                    <small className="form-note">ex: CSS, HTML, JS, React...</small>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={(event) => onChange(event)}/>
                    <small className="form-note">Want access to your repos?</small>
                </div>
                <div className="form-input">
                    <textarea type="text" placeholder="Bio" name="bio" value={bio} onChange={(event) => onChange(event)}></textarea>
                    <small className="form-note">Something about yourself</small>
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!socialInputs)} type="button" className="btn btn-light">
                        Add Social Media Links
                    </button>
                </div>

                {socialInputs && (<Fragment>
                    <div className="form-input social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(event) => onChange(event)}/>
                    </div>
                    <div className="form-input social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(event) => onChange(event)}/>
                    </div>
                    <div className="form-input social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(event) => onChange(event)}/>
                    </div>
                    <div className="form-input social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(event) => onChange(event)}/>
                    </div>
                    <div className="form-input social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="Youtube URL" name="youtube" value={youtube} onChange={(event) => onChange(event)}/>
                    </div>  
                </Fragment>)}

                <input type="submit" className="btn btn-primary" />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getUserProfile })(withRouter(EditProfile));