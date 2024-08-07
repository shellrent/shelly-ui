import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { InputProps } from '../Form';
import ReactQuill from 'react-quill';
import './style.css';
import FieldError from '../Common/FieldError';

type TextEditorProps = {
	placeholder?: string;
} & InputProps<string, string>

const TextEditor = forwardRef<HTMLInputElement, TextEditorProps>( ({ value, onValueChange, placeholder, error, validators, inputSize, ...props }, ref) => {
	const [err, setError] = useState(error);
	const prevValue = useRef<string | undefined>();
	const [htmlValue, setHtmlValue] = useState<string | undefined>(value);

	useEffect(() => {
		if (typeof error == 'string') {
			setError(error);

			return;
		}

		setError(Boolean(error));
	}, [error]);

	const onEditorChange = useCallback((val: string | undefined) => {
		if (prevValue.current === val) {
			return;
		}
		prevValue.current = val;
		setHtmlValue(val);

		if (onValueChange) {
			onValueChange(val);
		}

		if (!validators?.length) {
			return;
		}

		validators.every((validator) => {
			if (!validator) {
				return true;
			}

			const validationError = validator(htmlValue);

			setError(validationError ?? false);

			if (validationError) {
				return false;
			}

			return true;
		});
	}, [htmlValue]);

	useEffect(() => {
		if (value === undefined) {
			setHtmlValue('');
		}

		if (prevValue.current !== value) {
			setHtmlValue(value);
		}
	}, [value]);


	return <div>
		<input 
			type='hidden' 
			value={htmlValue === undefined ? '' : htmlValue} 
			{...props} 
			ref={ref} 
		/>
		<ReactQuill className={`rounded-btn ${err ? '!border border-error' : '!border-0'}`} theme="snow" placeholder={placeholder} value={htmlValue} onChange={onEditorChange} />
		<FieldError error={err}></FieldError>
	</div>;
} );

TextEditor.displayName = 'TextEditor';

export default TextEditor;