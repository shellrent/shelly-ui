import React, { useCallback, useEffect, useState } from 'react';
import { InputProps } from '../Form';
import ReactQuill from 'react-quill';
import './style.css';
import FieldError from '../Common/FieldError';

type TextEditorProps = {
	placeholder?: string;
} & InputProps

const TextEditor: React.FC<TextEditorProps> = ( { value, onValueChange, placeholder, error, validators, inputSize, ...props } ) => {
	const [err, setErr] = useState( error );
	const [htmlValue, setHtmlValue] = useState<string | undefined>( '' );

	const onEditorChange = useCallback( ( val: string | undefined ) => {
		setHtmlValue( val );
	}, [] );

	useEffect( () => {		
		if ( value === '' ) {
			return;
		}

		setHtmlValue( value );
	}, [value] );

	useEffect( () => {
		if ( onValueChange ) {
			onValueChange( htmlValue );
		}

		if ( !validators?.length ) {
			return;
		} 

		validators.every( (validator) => {
			if ( !validator ) {
				return true;
			}
			
			const validationError = validator( htmlValue );

			setErr( validationError ?? false );

			if ( validationError ) {
				return false;
			}

			return true;
		} );

	}, [htmlValue] );

	useEffect( () => {
		setErr( error );
	} ,[error]); 
	
	return <div>
		<input type='hidden' value={value === undefined ? '' : value} {...props}/> 
		<ReactQuill className={`rounded-btn ${err ? '!border border-error' : '!border-0'}`} theme="snow" placeholder={placeholder} value={htmlValue} onChange={onEditorChange} />
		<FieldError error={err}></FieldError>
	</div>;
};

export default TextEditor;