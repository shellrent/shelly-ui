import { RefObject, useEffect, useRef, useState } from "react";
import { InputValidationHandler } from "..";
import { InputProps } from "./form-input";

export class FormErrors {
	public formErrors: string[] = [];

	constructor(errors: string[]) {
		this.formErrors = errors;
	}

	public setFormErrors( formErrors: string[] ): FormErrors {
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
}

class FormValues<T extends { [key: string]: any } = any> {
	private formValues: T = {} as T;

	constructor( formValues: T ) {
		this.formValues = formValues;
	}

	public setFormValues( formValues: T ): FormValues {
		this.formValues = formValues;

		return this;
	}

	public getFormValue( name: string ): unknown | undefined {
		return this.formValues[name];
	}
}

type FormState<T extends { [key: string]: any } = any > = {
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
	registerInput: (props: RegisterHandlerProps) => InputProps
	triggerInputError: ( name: string ) => void,
	onSuccess?: () => void,
	registerOnSuccessCallback: ( callback: () => void ) => void
}


type UseFormProps<T = any> = {
	values?: T
	type?: 'data' | 'filter'
	onSuccess?: () => void
}

type InputDefinition = {
	name: string
	error?: boolean
	validators: Validator[]
}


const useForm = (props?: UseFormProps): FormHandler => {
	const onSuccess = useRef( props?.onSuccess );
	const [formErrors, setFormErrors] = useState<string[]>([]);
	const [state, setForm] = useState<FormState>({ inputs: {}, formValues: new FormValues( props?.values ), formErrors: new FormErrors(formErrors) });
	const [formValues, setValues] = useState(props?.values ?? {});
	const [inputs, setInputs] = useState<{[key:string] : InputDefinition}>({});
	const [submitting, setSubmitting] = useState(false);
	
	const ref = useRef<HTMLFormElement>(null);

	const setState = () => {
		setForm({
			...state,
			inputs: inputs,
			formErrors: state.formErrors ? state.formErrors.setFormErrors( formErrors ) : new FormErrors(formErrors),
			formValues: state.formValues ? state.formValues.setFormValues( formValues ) : new FormValues(formValues)
		});
	};

	useEffect(() => {
		setState();
	}, [formErrors, inputs, formValues]);

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
		let inps = inputs;
		for( const name of Object.keys( inputs ) ) {
			inps = {
				...inps,
				[name]: {
					...inputs[name],
					error: false
				}
			};
		}

		setInputs( inps );
	};

	const submitForm = (): void => {
		if (ref.current) {
			ref.current.requestSubmit();
		}
	};

	const triggerInputError = ( name: string ): void => {
		if ( !inputs[name] ) {
			return;
		}

		setInputs( {
			...inputs,
			[name]: {
				name: inputs[name].name,
				validators: inputs[name].validators,
				error: true
			}
		} );
	};

	const registerOnSuccessCallback = ( callback: () => void ) =>  {
		onSuccess.current =  () => {
			if ( props?.onSuccess ) {
				props.onSuccess();
			}

			callback();
		};
	};

	const registerInput = ({name, validators, disable}: RegisterHandlerProps): InputProps => {
		if ( disable ) {
			if ( inputs[name] ) {
				delete inputs[name];

				setInputs( inputs );
			}

			return {
				name: name,
				value: formValues[name] ?? "",
				validators: validators,
				inputSize: ( props?.type == 'filter' ) ? 'sm' : undefined,
				disabled: true
			};
		}

		if ( !inputs[name] ) {
			setInputs( {
				...inputs ?? {},
				[name]: {	
					name: name,
					validators: validators ?? [],
					error: false
				}
			} );

			setState();
		}

		const onFieldChangeValue = (value: string | null) => {
			setValues({
				...formValues,
				[name]: value
			});
		};

		return {
			name: name,
			value: formValues[name] ?? "",
			onValueChange: onFieldChangeValue,
			validators: validators,
			inputSize: ( props?.type == 'filter' ) ? 'sm' : undefined,
			error: inputs[name]?.error
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