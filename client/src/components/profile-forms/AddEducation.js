import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        addEducation(formData, history);
    }

    return (
        <div className="profile-form">
            <h1 className="lg primary-txt-form">Add Education</h1>
            <small>* = required field</small>
            <form className="form" onSubmit={(event) => onSubmit(event)}>
                <div className="form-element form-input">
                    <input 
                        className="form-element-field" 
                        type="text" 
                        placeholder="School name" 
                        name="school" 
                        value={school} 
                        onChange={(event) => onChange(event)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">* School</label>
                </div>
                <div className="form-element form-input">
                    <input 
                        className="form-element-field" 
                        type="text" 
                        placeholder="Degree or Certificate" 
                        name="degree" value={degree} 
                        onChange={(event) => onChange(event)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">* Degree</label>
                </div>
                <div className="form-element form-input">
                    <input 
                        className="form-element-field" 
                        type="text" 
                        placeholder="What did you study?" 
                        name="fieldofstudy" 
                        value={fieldofstudy} 
                        onChange={(event) => onChange(event)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label">Field of Study</label>
                </div>
                <div className="form-element form-input">
                    <textarea 
                        className="form-element-field" 
                        placeholder="Share any more details about your education" 
                        name="description" 
                        cols="20"
                        rows="3"
                        value={description} 
                        onChange={(event) => onChange(event)}
                    />
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
                <div className="form-input">
                    <p><input type="checkbox" name="current" checked={current} value={current} 
                    onChange={(event) => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)}}
                    /> * Current</p>
                </div>
                <div className="form-input">
                    <h4>* To Date:</h4>
                    <input type="date" name="to" value={to} onChange={(event) => onChange(event)} 
                    disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link> 
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation));