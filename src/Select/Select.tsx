import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { swtc } from "../utils";
import { InputProps } from "../Form";

export type SelectOption<T = any> = {
    title: string
    value: T
    disabled?: boolean
}

type SelectProps<T = any> = {
    displayFn?: ( option: T ) => ReactNode
    options: SelectOption<T>[]
    defaultOption?: SelectOption<T>
	placeholder?: string
    onChange?: ( value: T ) => void 
	showEmptyOption?: boolean
} & InputProps

const Select: React.FC<SelectProps> = ( {displayFn, value, defaultOption, onChange, onValueChange, name, placeholder, inputSize, error, validators, showEmptyOption, ...props} ) => {
	const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>( defaultOption );
	const [selectedValue, setSelectedValue] = useState<any | undefined>( value );
	const [options, setOptions] = useState<SelectOption[]>( props.options );
	const [err, setError] = useState<string | boolean>(false);

	useEffect(  () => {
		if ( showEmptyOption ) {
			setOptions( [
				{
					value: null,
					title: placeholder || 'Tutti'
				},
				...props.options
			] );

			return;
		} 

		setOptions( props.options );
	}, [props.options] );

	useEffect( () => {
		if ( typeof error == 'string' ) {
			setError( error );
		}

		if ( error ) {
			setError( true );
		}
	} , [error]);

	useEffect( () => {
		if ( value === "" ) {
			return;
		}

		if ( validators && validators.length ) {
			validators.every( (validator) => {
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
		}

		setSelectedValue( value );
	}, [value] );

	useEffect( () => {	
		const option = options.find( opt => opt.value == selectedValue );  
		setSelectedOption( option );

	} , [selectedValue]);

	const onSelectChange = ( value: any ) => {
		setSelectedValue( value );

		if ( onChange ) {
			onChange( value );
		}
		
		if (onValueChange) {
			onValueChange( value );
		}
	};


	const classNames = clsx(
		'select select-bordered relative w-full cursor-default text-left',
		err && 'select-error',
		inputSize && swtc( inputSize, {
			xs: 'select-xs',
			sm: 'select-sm',
			md: 'select-md',
			lg: 'select-lg'
		} )
	);

	return  <Listbox value={selectedValue} onChange={onSelectChange} name={name} {...props}>
		<div className="relative">    
			<Listbox.Button className={classNames}>
				<span className="h-full flex items-center truncate overflow-hidden">
					{
						(placeholder && !selectedOption) && <span className="text-sm text-gray-400 font-normal h-full flex items-center truncate">{placeholder}</span>
					}
					{       
						<span className="mx-1">{ (displayFn && selectedOption) ? displayFn( selectedOption ) : selectedOption?.title } </span>
					} 
				</span>
			</Listbox.Button>
			{
				err && <label className="label">
					{ typeof err == 'string' && <span className="label-text-alt text-error">{err}</span> }
				</label>
			}
			<Transition
				as={Fragment}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Listbox.Options className="absolute z-30 mt-1 pl-0 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					{options.map((option, key) => (
						<Listbox.Option
							key={key}
							className={({ active }) =>
								`relative cursor-default select-none py-2 list-none ${
									active ? 'bg-base-200' : 'text-neutral'
								}`
							}
							value={option.value}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate ${
											selected ? 'ml-8 font-medium' : 'ml-2 font-normal'
										} ${ option.value === null && 'text-neutral-400' }`}
									>
										{displayFn ? displayFn( option ) : option?.title}
									</span>
									{selected ? (
										<span className="absolute inset-y-0 left-0 flex items-center text-primary ml-2">
											<FontAwesomeIcon size="xs" icon={faCheck} className="h-5 w-5" aria-hidden="true" />
										</span>
									) : null}
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</div>
	</Listbox>;  
};

export default Select;