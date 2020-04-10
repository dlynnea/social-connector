import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState();
    const [filename, setFilename] = useState('Choose Photo');
    const [uploadedFile, setUploadedFile] = useState({})
const onChange = (event) => {
    setFile(event.taget.files[0]);
    setFilename(event.target.files[0].name);
}

const onSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file)

    try {
        const res = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath})
    } catch(err) {
        if(err.response.status === 500) {
            console.log('There was an error with the server!')
        } else {
            console.log(err.response.data.msg)
        }
    }

}

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                    <input 
                    type="file" 
                    className="custom-file-input" 
                    id="customFile" 
                    onChange={onChange}
                    />
                    <label className="customer-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input stype="submit" value="Upload" className="btn btn-primary" />
            </form>
        </Fragment>
    )
}

export default FileUpload
