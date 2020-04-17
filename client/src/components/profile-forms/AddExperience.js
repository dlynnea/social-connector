import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        addExperience(formData, history);
    }

    return (
        <div className="profile-form">
            <h1 className="lg primary-txt-form">Add Experience</h1>
            <small>* = required field</small>
            <form className="form exp-form" onSubmit={(event) => onSubmit(event)}>
                <div className="form-element form-input">
                    <input 
                        className="form-element-field" 
                        type="text" 
                        placeholder="Company Name" 
                        name="company" 
                        value={company} 
                        onChange={(event) => onChange(event)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">* Company</label>
                </div>
                <div className="form-element form-input">
                    <input 
                        className="form-element-field" 
                        type="text" 
                        placeholder="Your position" 
                        name="title" 
                        value={title} 
                        onChange={(event) => onChange(event)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">* Job Title</label>
                </div>
                <div className="form-element form-input">
                    <input 
                        className="form-element-field" 
                        type="text" 
                        placeholder="Where is it" 
                        name="location" 
                        value={location} 
                        onChange={(event) => onChange(event)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">Location</label>
                </div>
                <div className="form-element form-input">
                    <textarea 
                        className="form-element-field" 
                        placeholder="A short description of what you do.." 
                        name="description" 
                        value={description} 
                        onChange={(event) => onChange(event)}
                        cols="20"
                        rows="3"
                    ></textarea>
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">Description</label>
                </div>
                <div className="form-element form-input">
                    <h4>* From Date:</h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from} 
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <div className="form-element form-input">
                    <p><input 
                        type="checkbox" 
                        name="current" 
                        checked={current} 
                        value={current} 
                        onChange={(event) => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)}}
                    /> * Current</p>
                </div>
                <div className="form-element form-input">
                    <h4>* To Date:</h4>
                    <input 
                        type="date" 
                        name="to" 
                        value={to} 
                        onChange={(event) => onChange(event)} 
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link> 
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience));
