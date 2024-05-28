import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { SelectOption } from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { swtc } from "../utils";
import _ from "lodash";
import clsx from "clsx";
import { InputProps } from "../Form";
import { useTranslation } from "../i18n";
import useSelectError from "./useSelectError";
import FieldError from "../Common/FieldError";

export type MultiSelectProps<T = any> = {
	displayFn?: (option: T) => ReactNode
	options: SelectOption<T>[]
	defaultOption?: SelectOption<T>
	placeholder?: string
	onChange?: (value: T) => void
	showEmptyOption?: boolean
} & InputProps<string | string[], string[]>

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(({ displayFn, defaultOption, showEmptyOption, validators, name, onChange, onValueChange, placeholder, inputSize, error, ...props }, ref) => {
	const { t } = useTranslation();
	const [selectedValues, setSelectedValues] = useState<any | undefined>(props.value || []);
	const [selectedOptions, setSelectedOptions] = useState<SelectOption[] | undefined>(defaultOption && [defaultOption]);
	const [options, setOptions] = useState<SelectOption[]>(props.options);
	const { error: err, handleValidation } = useSelectError({ err: error, validators });
	const prevValues = useRef(props.value ?? []);

	useEffect(() => {
		if (showEmptyOption) {
			setOptions([
				{
					value: null,
					disabled: true,
					title: placeholder || t('inputs:all_placeholder')
				},
				...props.options
			]);

			return;
		}

		setOptions(props.options);
	}, [props.options]);


	const filterOption = useCallback((value: any) => {
		return options.flatMap((opt) => {

			if (value?.includes(opt.value)) {
				return [opt];
			}

			return [];
		});
	}, [options]);

	useEffect(() => {
		if (!options.length) {
			return;
		}

		let val: undefined | string[] | string = props?.value;

		if (props?.value == undefined) {
			val = [];
		}

		if ( props.value instanceof Array) {
			if ( props.value.find( v => v === null ) === null ) {
				val = options.map( opt => opt.value ).filter( v => v !== null );
			}
		} 

		if (typeof props?.value === 'string') {
			val = props?.value?.split(',')
				.filter(v => !_.isEmpty(v));
		}

		if (!_.isEqual(val, prevValues.current)) {
			handleValidation(val as string[]);
		}

		prevValues.current = val;
		setSelectedValues(val);

		const opts = filterOption(val);
		setSelectedOptions(opts);
	}, [props.value, options]);

	const onSelectChange = (value: any) => {
		setSelectedValues(value || []);

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
			xs: 'select-xs',
			sm: 'select-sm',
			md: 'select-md',
			lg: 'select-lg'
		})
	);

	return <Listbox ref={ref} value={selectedValues === undefined ? '' : selectedValues} onChange={onSelectChange} name={name} multiple>
		<div className="relative">
			<Listbox.Button className={classNames}>
				<span className="overflow-hidden h-full flex items-center">
					{
						(placeholder && !selectedOptions?.length) && <span className="text-sm text-base-content/40 font-normal">{placeholder}</span>
					}
					{
						selectedOptions?.map((opt, key) => (<span className={`mx-1 my-auto ${ opt.disabled && 'text-base-content/40 ' }`} key={key}> {displayFn ? displayFn(opt) : opt?.title} </span>))
					}
				</span>
			</Listbox.Button>
			<FieldError error={err} />
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
								`relative cursor-default select-none py-2 list-none ${active ? 'bg-base-200' : 'text-gray-900'
								}`
							}
							value={option.value}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate ${selected ? 'ml-8 font-medium' : 'ml-2 font-normal'} ${option.disabled && ' text-base-content/40 '}`}
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
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</div>
	</Listbox>;
} );

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;