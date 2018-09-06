import React from 'react'
import { Alert } from 'reactstrap'

export const FormPostErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <Alert color="danger" key={i}>{fieldName} {formErrors[fieldName]}</Alert>
                )
            } else {
                return '';
            }
        })}
    </div>