import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { swtc } from "../utils";
import { InputProps } from "../Form";
import FieldError from "../Common/FieldError";

import { useTranslation } from "../i18n";
import useSelectError from "./useSelectError";

export type SelectOption<T = any> = {
    title: string | JSX.Element
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
} & InputProps<string, string>

const Select: React.FC<SelectProps> = ( {displayFn, value, defaultOption, onChange, onValueChange, name, placeholder, inputSize, error, validators, showEmptyOption, ...props} ) => {
	const {t} = useTranslation();
	const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>( defaultOption );
	const [selectedValue, setSelectedValue] = useState<any | undefined>( value );
	const [options, setOptions] = useState<SelectOption[]>( props.options );
	const {error: err, handleValidation} = useSelectError({err: error, validators});
	const prevValue = useRef( value );

	useEffect( () => {
		if ( showEmptyOption ) {
			setOptions( [
				{
					value: null,
					disabled: true,
					title: placeholder || t('inputs:all_placeholder')
				},
				...props.options
			] );

			return;
		} 

		setOptions( props.options );
	}, [props.options] );


	useEffect( () => {
		if ( !options.length ) {
			setSelectedValue( undefined );
			setSelectedOption( undefined );
			return;
		}

		if ( prevValue.current !== value ) {
			handleValidation( value );
		}

		prevValue.current = value;
		setSelectedValue( value  );
	
		const option = options.find( opt => opt.value == value );  
		setSelectedOption( option );
	}, [value, options] );

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
			xs: 'select-xs !text-xs',
			sm: 'select-sm !text-sm',
			md: 'select-md !text-base',
			lg: 'select-lg !text-lg'
		} ),
		inputSize || 'text-base'
	);

	return  <Listbox value={selectedValue === undefined ? '' : selectedValue }  onChange={onSelectChange} name={name} {...props}>
		<div className="relative">    
			<Listbox.Button className={classNames}>
				<span className="h-full flex items-center truncate overflow-hidden">
					{
						(placeholder && selectedOption === undefined) && <span className="text-gray-400 font-normal h-full flex items-center truncate">{placeholder}</span>
					}
					{       
						<span className={ ((showEmptyOption && ( selectedOption?.value === null || selectedOption?.disabled ) ) ? '!text-gray-400' : '') + ' mx-1'}>{ (displayFn && selectedOption) ? displayFn( selectedOption ) : selectedOption?.title } </span>
					} 
				</span>
			</Listbox.Button>
			<FieldError error={err}></FieldError>
			<Transition
				as={Fragment}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Listbox.Options className="absolute z-30 mt-1 pl-0 max-h-60 w-full overflow-auto rounded-btn bg-base-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					{options.map((option, key) => (
						<Listbox.Option
							key={key}
							className={({ active }) =>
								`relative cursor-default select-none py-2 list-none ${
									active ? 'bg-base-200' : 'text-base-content'
								}`
							}
							value={option.value}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate ${
											selected ? 'ml-8 font-medium' : 'ml-2 font-normal'
										} ${ option.value === null && 'text-base-content/40' }`}
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