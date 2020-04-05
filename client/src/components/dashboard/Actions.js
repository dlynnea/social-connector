import React from 'react';
import { Link } from 'react-router-dom';

const Actions = () => {
    return (
        <div className="profile-btns">
            <Link to="/edit-profile" className="btn btn-light">
                Edit Your Profile
            </Link>
            <Link to="/add-education" className="btn btn-light">
                Add Education
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                Add Experience
            </Link>
        </div>
    )
}

export default Actions;
