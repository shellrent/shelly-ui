class FormErrors {
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

export default FormErrors;