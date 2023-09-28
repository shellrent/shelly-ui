import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { InputProps } from "../Form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type ToggleProps = {
    value?: boolean
} & Omit<InputProps, 'value'>  & InputHTMLAttributes<HTMLInputElement>

const Toggle: React.FC<ToggleProps> = ( { value, className, onValueChange, ...props} ) => {
	const [checked, setChecked] = useState<boolean>( value ?? false );
	const classNames = twMerge( 
		'toggle', 
		clsx(
			checked && 'toggle-accent'
		),
		className 
	);
    
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {  
		const val = event.target.checked;
        
		if( onValueChange ) {
			onValueChange( val );
		}

		setChecked( val );
	};

	return <input 
		{...props}
		type="checkbox" 
		className={classNames} 
		onChange={onChange} 
		checked={checked}
	/>;
};

export default Toggle;