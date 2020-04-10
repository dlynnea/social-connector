import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
    return (
        <div className="profile-btns">
            <Link to="/edit-profile" className="btn btn-light">
                Edit Profile
            </Link>
            <Link to="/add-education" className="btn btn-light">
            <i className="fas fa-plus"></i> Education
            </Link>
            <Link to="/add-experience" className="btn btn-light">
            <i className="fas fa-plus"></i> Experience
            </Link>
        </div>
    )
}

export default Links;
