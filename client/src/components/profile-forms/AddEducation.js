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
        <Fragment>
            <h1 className="lg primary-txt">Add Education</h1>
            <p className="lead">Add any school or training here</p>
            <small>* = required field</small>
            <form className="form" onSubmit={(event) => onSubmit(event)}>
                <div className="form-input">
                    <input type="text" placeholder="School" name="school" value={school} onChange={(event) => onChange(event)}/>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Degree or Certificate" name="degree" value={degree} onChange={(event) => onChange(event)}/>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={(event) => onChange(event)}/>
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
                        cols="20"
                        rows="5"
                        value={description} 
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link> 
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation));