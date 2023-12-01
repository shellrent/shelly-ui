import i18n from "../../../i18n";
export type InputValidatorHandler<T = any> = (value: T | null | undefined) => string | null ; 

export const isRequired = (errMessage: string | null = null): InputValidatorHandler => {
	const validator: InputValidatorHandler<string> = ( value ) => {
		if (!value || !value.length ) {
			return errMessage ? errMessage : i18n.t( 'validators.field_is_required' );
		}

		return null;
	};

	return validator;
};

export const isEmail = (errMessage: string): InputValidatorHandler => {
	return (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value as string)) {
			return errMessage;
		}

		return null;
	};
};

export const minCharacters = ( min: number,  errMessage: string ): InputValidatorHandler => {
	return ( value ) => {
		if ( !value ) {
			return errMessage;
		}

		if ( value.length < min ) {
			return errMessage;
		}

		return null;
	};
};


export const maxCharacters = ( max: number,  errMessage: string ): InputValidatorHandler<string> => {
	return ( value ) => {
		if ( !value ) {
			return errMessage;
		}

		if ( value.length > max ) {
			return errMessage;
		}

		return null;
	};
};

export const isUrl = ( errorMessage?: string | undefined ): InputValidatorHandler<string> => {
	return ( value ) => {
		if ( !value ) {
			return null;
		}

		const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/;
		if ( !urlRegex.test( value ) ) {
			return errorMessage ?? i18n.t( 'Il campo deve contenere un url valido' );
		}

		return null;
	};
};
