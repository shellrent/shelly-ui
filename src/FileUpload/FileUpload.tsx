import React, { ChangeEvent, InputHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { InputProps } from "../Form";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import FieldError from "../Common/FieldError";
import { swtc } from "../utils";

type FileUploadProps = {
    bordered?: boolean,
    className?: string
} & InputProps<File | File[], File> & InputHTMLAttributes<HTMLInputElement>

const FileUpload= forwardRef<HTMLInputElement, FileUploadProps>( ( { className, value, validators, bordered, inputSize, error, onValueChange, ...prop }, ref ) => {
	const [ err, setError ] = useState<string | boolean>( null );

	const classNames = twMerge( 
		clsx( 
			(bordered === false) || 'file-input-bordered',
			inputSize && swtc( inputSize, {
				xs: 'file-input-xs',
				sm: 'file-input-sm',
				md: 'file-input-md',
				lg: 'file-input-lg',
			} ),
			err && 'file-input-error'
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
		const fs = event.target.files;
		const files = new Array<File>();

		for( let i = 0; i < fs.length; i++ ) {
			if ( fs.item( i )?.size === 0 ) {
				continue;
			}

			files.push( fs.item( i ) );
		}

		if ( onValueChange ) {
			onValueChange( files.length ? files : null );
		}

		if ( !validators?.length ) {
			return;
		} 

		validators.every( (validator) => {
			if ( !validator ) {
				return true;
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
		<input 
			type="file" 
			className={classNames} 
			onChange={onChange} 
			{...prop}
			ref={ref} 
		/>
		<FieldError error={err}/>
	</>;
} );

FileUpload.displayName = 'FileUpload';

export default FileUpload;

