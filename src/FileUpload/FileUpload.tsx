import React, { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { InputProps } from "../Form";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import FieldError from "../Common/FieldError";
import { swtc } from "../utils";

type FileUploadProps = {
    bordered?: boolean,
    className?: string
} & InputProps<File | File[], File> & InputHTMLAttributes<HTMLInputElement>

const FileUpload: React.FC<FileUploadProps> = ( { className, value, validators, bordered, inputSize, error, onValueChange, ...prop } ) => {
	const [ err, setError ] = useState<string | boolean>( null );

	const classNames = twMerge( 
		clsx( 
			(bordered === false) || 'file-input-bordered',
			inputSize && swtc( inputSize, {
				xs: 'file-input-xs',
				sm: 'file-input-sm',
				md: 'file-input-md',
				lg: 'file-input-lg',
			} )
		),
		className,
		'file-input'
	);

	useEffect( () => {
		if ( typeof error == 'string' ) {
			setError( error );
		}

		setError( Boolean( error ) );
	} , [error]);
	

	const onChange = ( event: ChangeEvent<HTMLInputElement> ) => {
		const files = event.target.files;

		if ( onValueChange ) {
			onValueChange( files );
		}

		if ( !validators?.length ) {
			return;
		} 

		validators.every( (validator) => {
			if ( !validator ) {
				return true;
			}

			let files = [];

			if ( !(value instanceof Array)) {
				files = [value];
			} else {
				files = value;
			}

			for(const file of files) {
				const validationError = validator( file );
				setError( validationError ?? false );
				
				if ( validationError ) {
					return false;
				}
			}
			
			return true;
		} );
	};

	return <>
		<input type="file" className={classNames} onChange={onChange} {...prop}/>
		<FieldError error={err}/>
	</>;
};

export default FileUpload;

