import React, { Fragment } from 'react';
import wheel from './wheel.gif';

export default () => (
    <Fragment>
        <img
            src={wheel}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading....'
        />
    </Fragment>
)