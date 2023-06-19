import { useState } from "react";

export class FormHandler {
	public formErrors: string[] = [];

	public addError( error: string ): this {
		this.formErrors.push( error );

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

const useForm = () => {
	const [ form, setForm ] = useState<FormHandler>( new FormHandler() );

	const handleFormError = ( error: string ) => {
		setForm( form.addError( error ) );
	};

	return {form, handleFormError };
};

export default useForm;