import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience: { company, title, location, to, from, description }}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
                {!to ? 'Current' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
            <p>
                <strong>Location: </strong> {location}
            </p>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default Experience;
