import React, { useEffect, useState } from 'react';
import { InputProps } from '../Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FieldError from '../Common/FieldError';

type TextEditorProps = InputProps

const TextEditor: React.FC<TextEditorProps> = ( { value, onValueChange, error, validators, inputSize, ...props } ) => {
	const [err, setErr] = useState( error );
	const [htmlValue, setHtmlValue] = useState<string | undefined>( '' );

	const onEditorChange = ( val: string | undefined ) => {

		setHtmlValue( val );
	};

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
		<input type='hidden' value={value} {...props}/> 
		<ReactQuill className='!border-0 !rounded-box' theme="snow" value={htmlValue} onChange={onEditorChange} />
		<FieldError error={err}></FieldError>
	</div>;
};

export default TextEditor;