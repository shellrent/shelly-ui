import React, { ChangeEvent, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren, forwardRef, useEffect, useState } from "react";
import {twMerge} from 'tailwind-merge';
import clsx from "clsx";
import { InputValidatorHandler } from ".";
import { swtc } from "../utils";
import { InputProps } from "../Form";


type InputComponentProps = {
    bordered?: boolean,
} & InputProps & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputComponentProps>( ( {className, validators, bordered, inputSize, error, onValueChange, ...props}: InputComponentProps, ref ) => {	
	const [err, setError] = useState<string | boolean>( false );

	useEffect( () => {
		if ( typeof error == 'string' ) {
			setError( error );
		}

		if ( error ) {
			setError( true );
		}
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

		validators.every( (validator: InputValidatorHandler) => {
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
			{...props}
			ref={ref}
		/>
		{typeof err == 'string'  && <Label className="label-text-alt text-error"> {err} </Label>}
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
