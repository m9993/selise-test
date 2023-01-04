import React from 'react'
import { toast } from 'react-toastify';

export const inputValidation = async (schema, data) => {
    try {
        const success = await schema.validate(data);
        if (success) {
            return { isValidate: true }
        }
    } catch (err) {
        if (err) {
            toast.error(err.toString());
            return { isValidate: false, err }
        }
    }

}