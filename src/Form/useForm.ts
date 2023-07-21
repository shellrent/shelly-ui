import { MutableRefObject, useEffect, useRef, useState } from "react";
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

type RegisterHandler = {
	name: string,
	validators?: Validator[],
	disable?: boolean
}

export type FormHandler<T = any> = {
	state: FormState,
	ref: MutableRefObject<HTMLFormElement | undefined>,
	submitForm: () => void
	setFormValues: (values: T) => void
	handleFormError: (error: string | string[]) => void
	resetErrors: () => void
	resetFormValues: () => void
	resetInputs: () => void
	registerInput: (props: RegisterHandler) => InputProps
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
	const inputRef = useRef<{[key:string] : InputDefinition}>({});	
	const ref = useRef<HTMLFormElement>();

	useEffect(() => {
		setForm({
			...state,
			inputs: inputRef.current,
			formErrors: state.formErrors ? state.formErrors.setFormErrors( formErrors ) : new FormErrors(formErrors),
			formValues: state.formValues ? state.formValues.setFormValues( formValues ) : new FormValues(formValues)
		});
	}, [formErrors, inputRef.current, formValues]);


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
		for( const name of Object.keys( inputRef.current ) ) {
			const temp = inputRef.current[name];
			
			temp.error = false;
		
			inputRef.current = {
				...inputRef.current,
				[name]: temp
			};
		}

	};

	const submitForm = (): void => {
		if (ref.current) {
			ref.current.requestSubmit();
		}
	};

	const triggerInputError = ( name: string ): void => {
		if ( !inputRef.current[name] ) {
			return;
		}

		inputRef.current = {
			...inputRef.current,
			[name]: {
				name: inputRef.current[name].name,
				validators: inputRef.current[name].validators,
				error: true
			}
		};
	};

	const registerOnSuccessCallback = ( callback: () => void ) =>  {
		onSuccess.current =  () => {
			if ( props?.onSuccess ) {
				props.onSuccess();
			}

			callback();
		};
	};

	const registerInput = ({name, validators, disable}: RegisterHandler): InputProps => {
		if ( disable ) {
			if ( inputRef.current[name] ) {
				delete inputRef.current[name];
			}

			return {
				name: name,
				value: formValues[name] ?? "",
				validators: validators,
				inputSize: ( props?.type == 'filter' ) ? 'sm' : undefined,
				disabled: true
			};
		}

		if ( !inputRef.current[name] ) {
			inputRef.current = {
				...inputRef.current,
				[name]: {	
					name: name,
					validators: validators ?? [],
					error: false
				} 
			};
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
		resetInputs
	};
};

export default useForm;