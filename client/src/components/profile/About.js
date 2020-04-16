import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const About = ({ profile: { bio, skills, user: { name }}}) => {
    return (
        <div className="profile-about bg-light p-2">
            <h2 className="primary-txt">Skills</h2>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                         <i class="fas fa-angle-right"></i> {skill}
                    </div>
                ))}
            </div>
            { bio && (
                <Fragment>
                    <div className="line"></div>
                    <div className="bio">
                    <h2 className="primary-txt">{name.trim().split(' ')[0]}'s Bio</h2>
                    <p>{bio}</p>
                    </div>
                </Fragment>
            )}
            <div>
                <div className="line"></div>
                <div className="bio">
                <h2 className="primary-txt">another about item here</h2>
                <p>Lorem ipsum alksjdlkajsdlkjaljsdlakjsdlkjaldsj</p>
                </div>
            </div>
        </div>
    );
};

About.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default About;
