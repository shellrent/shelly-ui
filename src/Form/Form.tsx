import React, { FormEvent, PropsWithChildren, useState } from "react";
import { FormHandler } from "./useForm";
import Alert from "../Alert/Alert";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { switchClassName } from "../utils";

type FormProps<T extends object = any> = {
	saveForm: ( data: T ) => void
	form: FormHandler
} & PropsWithChildren; 


const Form: React.FC<FormProps> = < T extends object  >( {form, children, saveForm}: FormProps<T> ) => {
	const [formHandler, setForm] = useState( form ); 
	const onSubmit = ( event: FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
    
		const formData = new FormData( event.currentTarget );
		let data = {} as T;

		formData.forEach( ( value, key ) =>  {
			data = Object.assign( data, {
				[key]: value
			} );
		} );

		saveForm( data );	
	};

	return <form 
		onSubmit={onSubmit}
	>	
		{formHandler.hasErrors() &&
		<Alert type="error" className="mb-4">
			<div>
				<Alert.Title>
					Error
				</Alert.Title>
				<ul>
					{
						formHandler.getErrors().map( ( error, key ) => {
							return <li key={key}> {error} </li>;
						})
					}
				</ul>
			</div>
		</Alert>
		}
		{children}
	</form>;
};

type GridLayoutProps = PropsWithChildren; 

const GridLayout: React.FC<GridLayoutProps> = ({children}) => {
	return <div className="grid grid-cols-12 my-4 gap-4">{children}</div>;
};


type FormButtonsAlign = 'left' | 'center' | 'right';

type FormButtonsProps  = {
    align?: FormButtonsAlign | undefined
} & PropsWithChildren

const FormButtons: React.FC<FormButtonsProps> = ({children, align}) => {
	if( !align ) {
		align = 'right';
	}

	const classNames = twMerge(
		'my-4',
		clsx(
			align && switchClassName( align, {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right',
			} ),
		)
	);

	return <div className={classNames}>{children}</div>;
};

export default Object.assign(Form, {
	GridLayout,
	FormButtons
});


