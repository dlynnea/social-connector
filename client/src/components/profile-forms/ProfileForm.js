import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getUserProfile } from '../../actions/profile';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  avatar: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getUserProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getUserProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getUserProfile, profile]);

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

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className="profile-form">
      <h1 className="lg primary-txt">Edit Profile</h1>

      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        {/* <div className="form-input">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select and Interest or Status</option>
            <option value="Artist">Artist</option>
            <option value="Developer">Developer</option>
            <option value="Engineer">Engineer</option>
            <option value="Instructor">Instructor</option>
            <option value="Scientist">Scientist</option>
            <option value="Potter">Potter</option>
            <option value="Physicist">Physicist</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-note">
            Give us an idea of what you do
          </small>
        </div> */}


        {/* <div className="form-element form-select form-input">
            <select className="form-element-field" name="status" value={status} onChange={onChange}>
                <option disabled selected value="" className="form-select-placeholder"></option>
                <option value="Artist">Artist</option>
                <option value="Developer">Developer</option>
                <option value="Engineer">Engineer</option>
                <option value="Instructor">Instructor</option>
                <option value="Scientist">Scientist</option>
                <option value="Potter">Potter</option>
                <option value="Physicist">Physicist</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
            </select>
            <div className="form-element-bar"></div>
            <label className="form-element-label">*Select your interest or profession</label>
        </div> */}

        <div className="form-element form-input">
            <input 
              className="form-element-field" 
              placeholder="What do you currently do?" 
              name="status" 
              value={status} 
              onChange={onChange}
              type="input" 
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label">*Select your interest or profession</label>
        </div>

        <div className="form-element form-input">
            <input 
              className="form-element-field" 
              placeholder="Where do you work?" 
              type="input" 
              name="company"
              value={company}
              onChange={onChange}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label">*Company</label>
        </div>
        <div className="form-element form-input">
            <input 
              className="form-element-field" 
              type="input" 
              placeholder="Enter a personal website or portfolio"
              name="website"
              value={website}
              onChange={onChange}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label">Website</label>
        </div>
        <div className="form-element form-input">
            <input 
              className="form-element-field" 
              type="input" 
              placeholder="City & State (i.e. Denver, CO)"
              name="location"
              value={location}
              onChange={onChange}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label">Location</label>
        </div>
        <div className="form-element form-input">
            <input 
              className="form-element-field" 
              type="input" 
              placeholder="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
              name="skills"
              value={skills}
              onChange={onChange}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label">*Skills</label>
        </div>

        <div className="form-element form-textarea">
            <textarea 
              className="form-element-field" 
              placeholder="Tell us a little about yourself"
              name="bio"
              value={bio}
              onChange={onChange}>
            </textarea>
            <label className="form-element-label">Bio</label>
            <div className="form-element-bar"></div>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="social-media btn btn-light"
          >
            Social Media
          </button>
          <span>(Optional)</span>
        </div>


        {displaySocialInputs && (
          <Fragment>
            <div className="form-input social-input form-element">
              <i className="fab fa-twitter fa-2x" />
              <input
                className="form-element-field" 
                type="input" 
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            <label className="form-element-label"></label>
            <div className="form-element-bar"></div>
            </div>

            <div className="form-input form-element social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                className="form-element-field" 
                type="input" 
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
              <label className="form-element-label"></label>
              <div className="form-element-bar"></div>
            </div>

            <div className="form-input social-input form-element">
              <i className="fab fa-youtube fa-2x" />
              <input
                className="form-element-field" 
                type="input" 
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
              <label className="form-element-label"></label>
              <div className="form-element-bar"></div>
            </div>

            <div className="form-input social-input form-element">
              <i className="fab fa-linkedin fa-2x" />
              <input
                className="form-element-field" 
                type="input" 
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
              <label className="form-element-label"></label>
              <div className="form-element-bar"></div>
            </div>

            <div className="form-input social-input form-element">
              <i className="fab fa-instagram fa-2x" />
              <input
                className="form-element-field" 
                type="input" 
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
              <label className="form-element-label"></label>
              <div className="form-element-bar"></div>
            </div>
          </Fragment>
        )}

      <div className="form-actions">
        <Link className="btn btn-light my-1 form-btn-cancel -nooutline" to="/dashboard">
          Go Back
        </Link>
        <input type="submit" className="form-btn btn btn-primary my-1" />
      </div>
      </form>
      </div>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getUserProfile })(
  withRouter(ProfileForm)
);