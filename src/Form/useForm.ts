import { MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { InputValidationHandler } from "..";
import { InputProps } from "./form-input";
import _ from "lodash";

export class FormErrors {
	public formErrors: string[] = [];

	constructor(errors: string[]) {
		this.formErrors = errors;
	}

	public setFormErrors(formErrors: string[]): FormErrors {
		this.formErrors = formErrors;
		return this;
	}

	public addError(error: string): this {
		this.formErrors = [
			...this.formErrors,
			error
		];

		return this;
	}

	public reset(): this {
		this.formErrors = [];

		return this;
	}

	public hasErrors(): boolean {
		return Boolean(this.formErrors.length);
	}

	public getErrors(): string[] {
		return this.formErrors;
	}

	public isEqual(errors: string[]): boolean {
		if (errors.length !== this.formErrors.length) {
			return false;
		}

		for (let i = 0; i < errors.length; i++) {
			if (errors[i] !== this.formErrors[i]) {
				return false;
			}
		}

		return true;
	}
}

class FormValues<T extends { [key: string]: any } = any> {
	public formValues: T = {} as T;

	constructor(formValues: T) {
		this.formValues = formValues;
	}

	public setFormValues(formValues: T): FormValues {
		this.formValues = formValues;

		return this;
	}

	public getFormValue(name: string): unknown | undefined {
		if ( !this.formValues ) {
			return;
		}

		return this.formValues[name];
	}

	public getFormStringValue(name: string): string | undefined {
		if ( !this.formValues ) {
			return;
		}
 
		return this.formValues[name] === undefined ? undefined : String( this.formValues[name] );
	}

	public getFormIntValue(name: string): number | undefined {
		if ( !this.formValues ) {
			return;
		}
 
		return this.formValues[name] === undefined ? undefined : Number( this.formValues[name] );
	}

	public getFormBoolValue(name: string): boolean {
		if ( !this.formValues ) {
			return;
		}
 
		return this.formValues[name] === undefined ? false : Boolean( this.formValues[name] );
	}

	public isEqual(values: T): boolean {
		if (!values) {
			return false;
		}

		if (Object.entries(values).length !== Object.entries(this.formValues).length) {
			return false;
		}

		let isEqual = true;

		Object.entries(values).forEach(([key, value]) => {
			if (this.formValues[key] !== value) {
				isEqual = false;
			}
		});

		return isEqual;
	}
}

type FormState<T extends { [key: string]: any } = any> = {
	inputs: MutableRefObject<{ [key: string]: InputDefinition }>
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
	triggerInputError: (name: string) => void,
	registerOnSuccessCallback: (callback: () => void) => void
	handleOnSubmitted: (res: R) => void
}


export type UseFormProps<R extends Promise<any> | boolean, T = any> = {
	values?: T
	type?: 'data' | 'filter'
	onSuccess?: () => void
	onSubmitted?: (res: R, success: () => void, error: (error: string | string[]) => void, setSubmitting: (value: boolean) => void) => void;
}

type InputDefinition<V = unknown> = {
	name: string
	error?: boolean
	disable?: boolean
	validators: InputValidationHandler<V>[]
}


const useForm = <R extends Promise<any> | boolean>(props?: UseFormProps<R>): FormHandler => {
	const [formErrors, setFormErrors] = useState<string[]>([]);
	const inputRef = useRef<{ [key: string]: InputDefinition }>({});

	const [state, setForm] = useState<FormState>({ inputs: inputRef, formValues: new FormValues(props?.values), formErrors: new FormErrors(formErrors) });
	const [formValues, setValues] = useState(props?.values ?? {});
	const [submitting, setSubmitting] = useState(false);

	const successCallbacks = useRef([props?.onSuccess]);

	const ref = useRef<HTMLFormElement>(null);

	const setState = useCallback(() => {
		setForm((prev) => {
			return ({
				...prev,
				inputs: inputRef,
				formErrors:
					(prev.formErrors?.formErrors && prev.formErrors.isEqual(formErrors))
						? prev.formErrors
						: new FormErrors(formErrors),
				formValues:
					(prev.formValues?.formValues && prev.formValues.isEqual(formValues))
						? prev.formValues
						: new FormValues(formValues),
			});
		}
		);

	}, [formErrors, formValues]);

	useEffect(() => {
		setState();
	}, [setState]);

	const handleFormError = (error: string | string[]) => {
		if (!(error instanceof Array)) {
			error = [error];
		}

		setFormErrors(error);
	};

	const setFormValues = <T = any>(values: T) => {
		setValues(values);
	};

	const resetFormValues = () => {
		setValues({ ...{} });
	};

	const resetErrors = (): void => {
		setFormErrors([]);
	};

	const resetInputs = (): void => {
		inputRef.current = {};
	};

	const submitForm = (): void => {
		if (ref.current) {
			ref.current.requestSubmit();
		}
	};

	const triggerInputError = (name: string): void => {
		if (!inputRef.current[name]) {
			return;
		}

		inputRef.current = {
			...inputRef.current ?? {},
			[name]: {
				name: inputRef.current[name].name,
				validators: inputRef.current[name].validators,
				error: true
			}
		};

		return;
	};

	const handleOnSuccess = () => {
		if ( !successCallbacks.current.length ) {
			return;
		}

		for( const callback of successCallbacks.current ) {
			if ( !callback ) {
				continue;
			}

			callback();
		}
	};
 
	const registerOnSuccessCallback = (callback: () => void) => {
		successCallbacks.current = [
			...successCallbacks.current,
			callback,
		];
	};

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
				error: inputRef.current[name]?.error
			};
		}

		if (disable) {
			if (inputRef.current[name]) {
				const inps = inputRef.current;

				delete inps[name];

				inputRef.current = inps;
			}

			return {
				name: name,
				value: formValues[name],
				validators: validators,
				inputSize: (props?.type == 'filter') ? 'sm' : undefined,
				disabled: true
			};
		}

		if (!inputRef.current[name]) {
			inputRef.current = {
				...inputRef.current ?? {},
				[name]: {
					name: name,
					disable: disable,
					validators: validators ?? [],
					error: false
				}
			};
		}

		return {
			name: name,
			value: formValues[name],
			onValueChange: onFieldChangeValue,
			validators: validators,
			inputSize: (props?.type == 'filter') ? 'sm' : undefined,
			error: inputRef.current[name]?.error
		};
	};

	const handleOnSubmitted = (res: R) => {
		if (!props?.onSubmitted && res instanceof Promise) {
			res
				.then(() => handleOnSuccess)
				.catch((err) => handleFormError(err.message()));

			return;
		}

		if (!props?.onSubmitted) {
			res ? handleOnSuccess() : handleFormError('error');
		}

		if (props?.onSubmitted) {
			props.onSubmitted(res, handleOnSuccess, handleFormError, setSubmitting);
		}
	};

	return {
		state,
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