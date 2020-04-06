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
        <Fragment>
            <h1 className="lg primary-txt">Add Experience</h1>
            <p className="lead">Add your past positions here</p>
            <small>* = required field</small>
            <form className="form" onSubmit={(event) => onSubmit(event)}>
                <div className="form-input">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={(event) => onChange(event)}/>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Job Title" name="title" value={title} onChange={(event) => onChange(event)}/>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(event) => onChange(event)}/>
                </div>
                <div className="form-input">
                    <h4>From Date:</h4>
                    <input type="date" name="from" value={from} onChange={(event) => onChange(event)}/>
                </div>
                <div className="form-input">
                    <p><input type="checkbox" name="current" checked={current} value={current} 
                    onChange={(event) => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)}}
                    /> Current</p>
                </div>
                <div className="form-input">
                    <h4>To Date:</h4>
                    <input type="date" name="to" value={to} onChange={(event) => onChange(event)} 
                    disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="form-input">
                    <textarea 
                    placeholder="Description" 
                    name="description" 
                    value={description} 
                    onChange={(event) => onChange(event)}
                    cols="20"
                    rows="5"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary" />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link> 
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience));
