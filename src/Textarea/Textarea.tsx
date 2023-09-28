import React, { ChangeEventHandler, TextareaHTMLAttributes, useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import {InputProps} from "../Form";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps
const Textarea: React.FC<TextareaProps> = ( {className, value, onValueChange, inputSize, error, ...props} ) => {
	const [curretValue, setCurrentValue] = useState( value );

	const classNames = twMerge(
		'textarea textarea-bordered',
		className
	);

	useEffect( () => {
		setCurrentValue( value );
	}, [value] );

	const onChange: ChangeEventHandler<HTMLTextAreaElement> = ( event ) => {
		const val = event.target.value;

		if ( onValueChange ) {
			onValueChange( val );
		}

		setCurrentValue(val);
	};

	return <textarea {...props} className={classNames} value={curretValue} onChange={ onChange }></textarea>;
};

export default Textarea;