import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { SelectOption } from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { swtc } from "../utils";
import _ from "lodash";
import clsx from "clsx";

export type MultiSelectProps<T = any> = {
    displayFn?: ( option: T ) => ReactNode
    options: SelectOption<T>[]
    defaultOption?: SelectOption<T>
    name?: string
	value?: string
	placeholder?: string
	onValueChange?: ( value: any ) => void
    onChange?: ( value: T ) => void 
	inputSize?: 'xs' | 'sm' | 'md' | 'lg' | undefined
}

const MultiSelect: React.FC<MultiSelectProps> = ( {displayFn, options, defaultOption,  name, onChange, onValueChange, placeholder, inputSize, ...props} ) => {
	const [selectedValues, setSelectedValues] = useState<any | undefined>( props.value || [] );
	const [selectedOptions, setSelectedOptions] = useState<SelectOption[] | undefined>( defaultOption && [defaultOption] );

	const filterOption = ( value: any ) => {
		return options.flatMap( (opt) => {

			if ( value?.includes( opt.value ) ) {
				return [ opt ];
			}

			return [];
		} );
	};

	useEffect( () => {
		let val: string | undefined | string[] = props?.value;
		
		if ( props?.value == undefined ) {
			val = [];
		}

		if ( !_.isArray( val )  ) {
			val = props?.value?.split( ',' ).filter( v => !_.isEmpty( v ) );
		}

		setSelectedValues( val );
	}, [props.value] );

	useEffect( () => {
		const opts =  filterOption( selectedValues );

		setSelectedOptions( opts );
	} , [selectedValues, options]);

	const onSelectChange = ( value: any ) => {
		setSelectedValues( value || [] );

		if ( onChange ) {
			onChange( value );
		}
		
		if (onValueChange) {
			onValueChange( value );
		}
	};

	const classNames = clsx(
		'select select-bordered relative w-full cursor-default text-left',
		inputSize && swtc( inputSize, {
			xs: 'select-xs',
			sm: 'select-sm',
			md: 'select-md',
			lg: 'select-lg'
		} )
	);


	return <Listbox value={selectedValues} onChange={onSelectChange} name={name} multiple>
		<div className="relative">
			<Listbox.Button className={classNames}>
				<span className="overflow-hidden inline-block h-full flex items-center">
					{
						(placeholder && !selectedOptions?.length) && <span className="text-sm text-gray-400 font-normal">{placeholder}</span>
					}
					{       
						selectedOptions?.map((opt, key) => ( <span className="mx-1 my-auto" key={key}> { displayFn ? displayFn( opt ) : opt?.title } </span> ))
					} 
				</span>
			</Listbox.Button>
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
									active ? 'bg-base-200' : 'text-gray-900'
								}`
							}
							value={option.value}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate ${
											selected ? 'ml-8 font-medium' : 'ml-2 font-normal'
										}`}
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

export default MultiSelect;