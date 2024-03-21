import { useEffect, useState } from "react";
import { InputValidatorHandler } from "../Input";

type UseErrorProps<V = unknown> = {
    err?: string | boolean
    validators?: InputValidatorHandler<V>[]
}

type ErrorHandler<V = unknown> = {
    error: string | boolean
    handleValidation: ( value: V ) => void
}

const useSelectError = <V = unknown>({err, validators}: UseErrorProps<V>): ErrorHandler<V> => {
	const [error, setError] = useState<string | boolean>(false);
	useEffect(() => {
		if (typeof err == 'string') {
			setError(err);
		}

		if (err) {
			setError(true);
		}
	}, [err]);

	const handleValidation = (value: V) => {
		if ( validators && validators.length ) {
			validators.every( (validator) => {
				if ( !validator ) {
					return true;
				}
                
				const validationError = validator( value );
                
				setError( validationError ?? false );
                
				if ( validationError ) {
					return false;
				}
                
				return true;
			} );
		}
	};

	return {
		error,
		handleValidation
	};
};

export default useSelectError;
