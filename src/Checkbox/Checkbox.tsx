import React, { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { swtc } from "../utils";
import { InputProps } from "../Form";
import FieldError from "../Common/FieldError";

type CheckboxProps = {
    checkboxType?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | undefined
} & InputProps<boolean, boolean> & Omit<InputHTMLAttributes<HTMLInputElement>, "value">

const Checkbox: React.FC<CheckboxProps> = ( {checkboxType, onValueChange, children, className, error, validators, value, inputSize,  ...props} ) => {
	const [err, setError] = useState<string | boolean | undefined>(false);

	const classNames = twMerge( 
		'checkbox',
		checkboxType && swtc( checkboxType, {
			primary: 'checkbox-primary',
			secondary: 'checkbox-secondary',
			accent: 'checkbox-accent',
			info: 'checkbox-info',
			success: 'checkbox-success',
			warning: 'checkbox-warning',
			error: 'checkbox-error',
		}),
		inputSize && swtc( inputSize, {
			xs: 'checkbox-xs',
			sm: 'checkbox-sm',
			md: 'checkbox-md',
			lg: 'checkbox-lg',
		} ),
		err && 'checkbox-error',
		className,
	);

	useEffect( () => {
		if ( typeof error == 'string' ) {
			setError( error );

			return;
		}

		setError( Boolean( error ) );
	} , [error]);

	const onChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		const value = e.target.checked;

		if ( onValueChange ) {
			onValueChange( value );
		}

		if ( !validators?.length ) {
			return;
		} 

		validators.every( (validator) => {
			if ( !validator ) {
				return true;
			}
			
			const validationError = validator( value );

			setError( validationError ?? false );

			if ( validationError ) {
				return false;
			}

			return true;
		} );
	};


	return <>
		<input type="checkbox" onChange={ onChange } className={classNames} {...props} checked={Boolean( value )}>
			{children}
		</input>
		<FieldError error={err}></FieldError>
	</>;
};

export default Checkbox;