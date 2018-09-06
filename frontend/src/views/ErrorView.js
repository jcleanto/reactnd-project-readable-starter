import React from 'react'
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap'

export const ErrorView = () => {
    return (
        <div>
            <Alert color="danger">Page not found</Alert>
        </div>
    )
}