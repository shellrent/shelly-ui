import React, { ChangeEvent, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren, useState } from "react";
import {twMerge} from 'tailwind-merge';
import clsx from "clsx";
import { InputValidatorHandler } from ".";

type InputProps = {
    bordered?: boolean,
	validators?: InputValidatorHandler[]
} & InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ( {className, validators, bordered, ...props}: InputProps ) => {
	const [error, setError] = useState<string | null>( null );

	const classNames = twMerge(
		'input',
		'input-bordered',
		className,
		clsx( 
			error && 'input-error'  
		)
	);
    
	const validateInput = ( event: ChangeEvent<HTMLInputElement>  ) => {
		const value = event.target.value;

		if ( !validators?.length ) {
			return;
		} 

		validators.every( (validator: InputValidatorHandler) => {
			const validationError = validator( value );

			setError( validationError );

			if ( validationError ) {
				return false;
			}

			return true;
		} );
	};

	return <>
		<input 
			className={classNames}
			onChange={validateInput}
			onFocus={validateInput}
			{...props} 
		/>
		{error && <Label className="label-text-alt text-error"> {error} </Label>}
	</>;
};

type FormControlProps = HTMLAttributes<HTMLElement> & PropsWithChildren

const FormControl: React.FC<FormControlProps> = ( { className, children, ...props } ) => {
	const classNames = twMerge( 
		className,
		'form-control'
	);

	return <div 
		className={classNames} 
		{...props}>
		{children}
	</div>;
};

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & PropsWithChildren

const Label: React.FC<LabelProps> = ( {children, className, ...props}: LabelProps ) => {
	const classNames = twMerge(
		'label',
		className
	);

	return <label
		className={classNames}
		{...props}
	>
		{ children }
	</label>;
};

export default Object.assign( Input, {
	Label,
	FormControl
} );
