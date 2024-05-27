import React, { ChangeEvent, HTMLAttributes, InputHTMLAttributes, PropsWithChildren, forwardRef, useEffect, useState } from "react";
import {twMerge} from 'tailwind-merge';
import clsx from "clsx";
import { swtc } from "../utils";
import { InputProps } from "../Form";
import Label from "../Common/FieldLabel";
import FieldError from "../Common/FieldError";

type InputComponentProps = {
    bordered?: boolean,
} & InputProps<string, string> & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputComponentProps>( ( {value, className, validators, bordered, inputSize, error, onValueChange, defaultValue, ...props}: InputComponentProps, ref ) => {	
	const [err, setError] = useState<string | boolean>( false );

	useEffect( () => {
		if ( typeof error == 'string' ) {
			setError( error ); 

			return;
		}

		setError( Boolean( error ) );
	} , [error]);
	
	const classNames = twMerge(
		'input',
		className,
		clsx( 
			err && 'input-error',
			(bordered === false) || 'input-bordered',
			inputSize && swtc( inputSize, {
				xs: 'input-xs',
				sm: 'input-sm',
				md: 'input-md',
				lg: 'input-lg',
			} )
		)
	);
    
	const onChange = ( event: ChangeEvent<HTMLInputElement>  ) => {
		const value = event.target.value;

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
		<input 
			className={classNames}
			onChange={onChange}
			ref={ref}
			value={value === undefined ? (defaultValue ?? '') : value}
			{...props}
		/>
		<FieldError error={err}></FieldError>
	</>;
});

Input.displayName = 'Input';

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


export default Object.assign( Input, {
	Label: Label,
	FormControl
} );
