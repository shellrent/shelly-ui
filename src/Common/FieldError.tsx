
import React from 'react';
import Label from './FieldLabel';

type FieldErrorProps = {
    error: string | boolean | null | undefined
}

const FieldError: React.FC<FieldErrorProps> = ( {error} ) => {
	return <>{typeof error == 'string'  && <Label className="label-text-alt text-error"> {error} </Label>}</>; 
};

export default FieldError;