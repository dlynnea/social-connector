import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const About = ({ profile: { bio, skills, hobbies, user: { name }}}) => {
    return (
        <div className="profile-about bg-light p-2">
            <h2 className="primary-txt">Skills</h2>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        {skill}
                    </div>
                ))}
            </div>
            <div>
            <div className="line"></div>
                <h2 className="primary-txt">Interests</h2>
                    <div className="skills">
                        {hobbies.map((hobby, index) => (
                            <div key={index} className="p-1">
                            {hobby}
                            </div>
                        ))}
                    </div>
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
        </div>
    );
};

About.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default About;
