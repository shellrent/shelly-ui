import { RefObject, useCallback, useEffect, useRef, useState } from "react";
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
		return this.formValues[name];
	}

	public isEqual(values: T): boolean {
		const exists = Object.entries( values ).find( ([key, value]) => this.formValues[ key ] !== value );

		return Boolean( !exists ); 
	}
}

type FormState<T extends { [key: string]: any } = any> = {
	inputs: { [key: string]: InputDefinition }
	formValues: FormValues<T>
	formErrors: FormErrors
}

type Validator = InputValidationHandler | undefined

type RegisterHandlerProps = {
	name: string,
	validators?: Validator[] | undefined,
	disable?: boolean
}

export type FormHandler<T = any> = {
	state: FormState,
	ref: RefObject<HTMLFormElement>,
	submitting: boolean
	setSubmitting: (value: boolean) => void
	submitForm: () => void
	setFormValues: (values: T) => void
	handleFormError: (error: string | string[]) => void
	resetErrors: () => void
	resetFormValues: () => void
	resetInputs: () => void
	registerInput: <TValue = string>(props: RegisterHandlerProps) => InputProps<TValue>
	triggerInputError: (name: string) => void,
	onSuccess?: () => void,
	registerOnSuccessCallback: (callback: () => void) => void
}


type UseFormProps<T = any> = {
	values?: T
	type?: 'data' | 'filter'
	onSuccess?: () => void
}

type InputDefinition = {
	name: string
	error?: boolean
	disable?: boolean
	validators: Validator[]
}


const useForm = (props?: UseFormProps): FormHandler => {
	const [formErrors, setFormErrors] = useState<string[]>([]);
	const [state, setForm] = useState<FormState>({ inputs: {}, formValues: new FormValues(props?.values), formErrors: new FormErrors(formErrors) });
	const [formValues, setValues] = useState(props?.values ?? {});
	const [submitting, setSubmitting] = useState(false);

	const onSuccess = useRef(props?.onSuccess);
	const inputRef = useRef<{ [key: string]: InputDefinition }>({});

	const ref = useRef<HTMLFormElement>(null);

	const setState = useCallback(() => {
		setForm((prev) => {
			return ({
				...prev,
				inputs: inputRef.current,
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
		setValues({});
	};

	const resetErrors = (): void => {
		setFormErrors([]);
	};

	const resetInputs = (): void => {
		let inps = inputRef.current;
		for (const name of Object.keys(inputRef.current)) {
			inps = {
				...inps,
				[name]: {
					...inputRef.current[name],
					error: false
				}
			};
		}

		inputRef.current = inps;
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

	const registerOnSuccessCallback = (callback: () => void) => {
		onSuccess.current = () => {
			if (props?.onSuccess) {
				props.onSuccess();
			}

			callback();
		};
	};

	const registerInput = <TValue = string>({ name, validators, disable }: RegisterHandlerProps): InputProps<TValue> => {
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
				value: formValues[name] ?? "",
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
				value: formValues[name] ?? "",
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
			value: formValues[name] ?? "",
			onValueChange: onFieldChangeValue,
			validators: validators,
			inputSize: (props?.type == 'filter') ? 'sm' : undefined,
			error: inputRef.current[name]?.error
		};
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
		onSuccess: onSuccess.current,
		resetInputs,
		submitting,
		setSubmitting
	};
};

export default useForm;