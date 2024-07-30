import { RefObject, useCallback, useRef, useState } from "react";
import { InputValidationHandler } from "..";
import { InputProps } from "./form-input";
import _ from "lodash";
import FormErrors from "./FormErrors";
import FormValues from "./FormValues";

type FormState<T extends { [key: string]: any } = any> = {
	inputs: { [key: string]: InputDefinition }
	formValues: FormValues<T>
	formErrors: FormErrors
}

type RegisterHandlerProps<V = unknown> = {
	name: string,
	validators?: InputValidationHandler<V>[] | undefined,
	disable?: boolean
}

export type FormHandler<R = Promise<any> | boolean, T = any> = {
	state: FormState,
	ref: RefObject<HTMLFormElement>,
	submitting: boolean
	submitForm: () => void
	setFormValues: (values: T) => void
	handleFormError: (error: string | string[]) => void
	resetErrors: () => void
	resetFormValues: () => void
	resetInputs: () => void
	registerInput: <TValue = string, V = unknown>(props: RegisterHandlerProps<V>) => InputProps<TValue, V>
	triggerInputError: (name: string, message?: string) => void,
	registerOnSuccessCallback: (callback: () => void) => void
	handleOnSubmitted: (res: R) => void
}


export type UseFormProps<R extends Promise<any> | boolean, T = any> = {
	values?: T
	type?: 'data' | 'filter'
	onSuccess?: () => void
	onSubmitted?: (res: R, success: () => void, error: (error: string | string[]) => void, setSubmitting: (value: boolean) => void) => void;
}

export type InputDefinition<V = unknown> = {
	name: string
	error?: boolean | string
	disable?: boolean
	validators: InputValidationHandler<V>[]
}


const useForm = <R extends Promise<any> | boolean>(props?: UseFormProps<R>): FormHandler => {
	const [formErrors, setFormErrors] = useState<string[]>([]);
	const inputRef = useRef<{ [key: string]: InputDefinition }>({});
	const [formValues, setValues] = useState(props?.values ?? {});
	const [submitting, setSubmitting] = useState(false);
	const setInputs = useCallback( (inputs: { [key: string]: InputDefinition }) => {
		inputRef.current = inputs;
	}, [] );

	const successCallbacks = useRef([props?.onSuccess]);

	const ref = useRef<HTMLFormElement>(null);

	const handleFormError = useCallback( (error: string | string[]) => {
		if (!(error instanceof Array)) {
			error = [error];
		}

		setFormErrors(error);
	}, [] );

	const setFormValues = useCallback( <T = any>(values: T) => {
		setValues(values);
	}, [] );

	const resetFormValues = useCallback( () => {
		setValues({ ...{} });
	}, [] );

	const resetErrors = useCallback( (): void => {
		setFormErrors([]);
	}, [] );

	const resetInputs = useCallback( (): void => {
		setInputs({});
	}, [] );

	const submitForm = useCallback( (): void => {
		if (ref.current) {
			ref.current.requestSubmit();
		}
	}, [] );

	const triggerInputError = useCallback( (name: string, message?: string): void => {
		if (!inputRef.current[name]) {
			return;
		}

		setInputs( {
			...inputRef.current ?? {},
			[name]: {
				name: inputRef.current[name].name,
				validators: inputRef.current[name].validators,
				error: message ? message : true,
			}
		} );
		return;
	}, [inputRef.current]	);

	const handleOnSuccess = useCallback( () => {
		if ( !successCallbacks.current.length ) {
			return;
		}

		for( const callback of successCallbacks.current ) {
			if ( !callback ) {
				continue;
			}

			callback();
		}
	}, [] );
 
	const registerOnSuccessCallback = useCallback( (callback: () => void) => {
		successCallbacks.current = [
			...successCallbacks.current,
			callback,
		];
	}, [] );

	const registerInput = <TValue = string, V = unknown>({ name, validators, disable }: RegisterHandlerProps<V>): InputProps<TValue, V> => {
		const onFieldChangeValue = (value: string | null) => {
			if (formValues[name] !== value) {
				setValues({
					...formValues,
					[name]: value
				});
			}

		};


		if (inputRef.current[name] &&
			inputRef.current[name].disable == disable &&
			_.isEqual(inputRef.current[name].validators, validators)) {
			return {
				name: name,
				value: formValues[name],
				onValueChange: onFieldChangeValue,
				validators: validators,
				inputSize: (props?.type == 'filter') ? 'sm' : undefined,
				error: inputRef.current[name]?.error,
			};
		}

		if (disable) {
			if (inputRef.current[name]) {
				const inps = inputRef.current;

				delete inps[name];

				setInputs( inps );
			}

			return {
				name: name,
				value: formValues[name],
				validators: validators,
				inputSize: (props?.type == 'filter') ? 'sm' : undefined,
				disabled: true,
			};
		}

		if (!inputRef.current[name]) {
			setInputs( {
				...inputRef.current ?? {},
				[name]: {
					name: name,
					disable: disable,
					validators: validators ?? [],
					error: false,
				}
			} );
		}

		return {
			name: name,
			value: formValues[name],
			onValueChange: onFieldChangeValue,
			validators: validators,
			inputSize: (props?.type == 'filter') ? 'sm' : undefined,
			error: inputRef.current[name]?.error,
		};
	};

	const handleOnSubmitted = useCallback( (res: R) => {
		if (!props?.onSubmitted && res instanceof Promise) {
			res
				.then(() => handleOnSuccess)
				.catch((err) => handleFormError(err.message()));

			return;
		}

		if (!props?.onSubmitted) {
			res ? handleOnSuccess() : handleFormError('Error');
		}

		if (props?.onSubmitted) {
			props.onSubmitted(res, handleOnSuccess, handleFormError, setSubmitting);
		}
	}, [ props?.onSubmitted ] );

	const buildFormValues = () => {
		return Object.keys(inputRef.current).reduce( (acc, key) => {
			acc[key] = formValues[key];
			return acc;
		}, {} );
	};

	return {
		state: { 
			inputs: inputRef.current, 
			formValues: new FormValues(buildFormValues()), 
			formErrors: new FormErrors(formErrors) 
		},
		submitForm,
		setFormValues,
		resetFormValues,
		handleFormError,
		resetErrors,
		ref,
		registerInput,
		triggerInputError,
		registerOnSuccessCallback,
		resetInputs,
		submitting,
		handleOnSubmitted,
	};
};

export default useForm;