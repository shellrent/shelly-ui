import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { swtc } from "../utils";
import FieldError from "../Common/FieldError";

import useSelectError from "./useSelectError";
import { InputProps } from "../Form";

export type AutocompleteOption<T = any> = {
	title: string,
	value: T
}

type AutocompleteProps<T = any> = {
    displayFn?: ( option: T ) => ReactNode
    options: AutocompleteOption<T>[]
    defaultValue?: T
	placeholder?: string
    onChange?: ( value: T ) => void 
    onQueryChange?: ( query: string ) => void
} & InputProps<string, string>


const Autocomplete: React.FC<AutocompleteProps> = ({displayFn, value, onQueryChange, defaultValue, onChange, onValueChange, name, inputSize, error, validators, placeholder, options, ...props}) => {
	const [selectedValue, setSelectedValue] = useState<any | undefined>(value);
	const { error: err, handleValidation } = useSelectError({ err: error, validators });
	const prevValue = useRef(value);

	const findOption = useCallback( () => {
		return options.find(opt => opt.value == selectedValue);
	}, [options, selectedValue] );

	useEffect(() => {
		if (!options.length) {
			setSelectedValue(undefined);
			return;	
		}

		const val = value === undefined ? defaultValue : value;

		if (prevValue.current !== val) {
			handleValidation(val);
		}
 
		prevValue.current = val;
		setSelectedValue(val);
	}, [value, options, defaultValue]);

	const onSelectChange = (value: any) => {
		setSelectedValue(value);

		if (onChange) {
			onChange(value);
		}

		if (onValueChange) {
			onValueChange(value);
		}
	};


	const classNames = clsx(
		'select select-bordered relative w-full cursor-default text-left',
		err && 'select-error',
		inputSize && swtc(inputSize, {
			xs: 'select-xs !text-xs',
			sm: 'select-sm !text-sm',
			md: 'select-md !text-base',
			lg: 'select-lg !text-lg'
		}),
		inputSize || 'text-base'
	);

	return <Combobox value={selectedValue === undefined ? '' : selectedValue} onChange={onSelectChange} refName={name} {...props}>
		<div className="relative">
			<Combobox.Input
				placeholder={placeholder}
				className={classNames}
				displayValue={ () => findOption()?.title || '' }
				onChange={(event) => onQueryChange(event.target.value)}
			/>
			<Combobox.Button  className="absolute inset-y-0 right-0 flex items-center pr-2 h-full w-full" />
			<FieldError error={err}></FieldError>
			<Transition
				as={Fragment}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Combobox.Options className="absolute z-30 mt-1 pl-0 max-h-60 w-full overflow-auto rounded-btn bg-base-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					{options.map((option, key) => (
						<Combobox.Option
							key={key}
							className={({ active }) =>
								`relative cursor-default select-none py-2 list-none ${active ? 'bg-base-200' : 'text-base-content'
								}`
							}
							value={option.value}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate ${selected ? 'ml-8 font-medium' : 'ml-2 font-normal'
										} ${option.value === null && 'text-base-content/40'}`}
									>
										{displayFn ? displayFn(option) : option?.title}
									</span>
									{selected ? (
										<span className="absolute inset-y-0 left-0 flex items-center text-primary ml-2">
											<FontAwesomeIcon size="xs" icon={faCheck} className="h-5 w-5" aria-hidden="true" />
										</span>
									) : null}
								</>
							)}
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Transition>
		</div>
	</Combobox>;
};

export default Autocomplete;