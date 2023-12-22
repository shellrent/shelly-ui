import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { swtc } from "../utils";
import { InputProps } from "../Form";

type CheckboxProps = {
    checkboxType?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | undefined
	value: boolean,
} & Omit<InputProps, "value"> & Omit<InputHTMLAttributes<HTMLInputElement>, "value">

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
		{
			(err && typeof err == 'string') && <label className="label">
				<span className="label-text-alt">{err}</span>
			</label>
		}
	</>;
};

export default Checkbox;