import React, { ChangeEventHandler, TextareaHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { InputProps } from "../Form";
import FieldError from "../Common/FieldError";
import clsx from "clsx";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps<string, string>;
const Textarea: React.FC<TextareaProps> = ({ className, value, onValueChange, validators, inputSize, error, ...props }) => {
	const [curretValue, setCurrentValue] = useState(value);
	const [err, setError] = useState<string | boolean>(error);

	useEffect(() => {
		if (typeof error == 'string') {
			setError(error);

			return;
		}

		setError(Boolean(error));
	}, [error]);

	const classNames = twMerge(
		'textarea textarea-bordered',
		clsx(
			err && 'textarea-error',
		),
		className
	);

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		const val = event.target.value;

		if (onValueChange) {
			onValueChange(val);
		}
		
		setCurrentValue(val);

		if ( !validators?.length ) {
			return;
		} 

		validators.every( (validator) => {
			if ( !validator ) {
				return true;
			}
			
			const validationError = validator( val );

			setError( validationError ?? false );

			if ( validationError ) {
				return false;
			}

			return true;
		} );
	};

	return <>
		<textarea
			{...props}
			className={classNames}
			value={curretValue === undefined ? '' : curretValue}
			onChange={onChange}
		></textarea>
		<FieldError error={err}></FieldError>
	</>;
};

export default Textarea;