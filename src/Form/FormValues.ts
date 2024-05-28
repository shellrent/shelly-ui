
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

	public getFormStringValue(name: string, allowEmpty = false): string | undefined {
		if ( !this.formValues ) {
			return;
		}

		if ( allowEmpty ) {
			return this.formValues[name] === undefined ? undefined : String( this.formValues[name] );
		}
 
		return this.formValues[name] === undefined || this.formValues[name] === '' ? undefined : String( this.formValues[name] );
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

export default FormValues;