import { InputValidationHandler } from "..";

export type InputSize = 'xs' | 'sm' | 'lg' | 'md';

export type InputProps<TValue = string> = { 
	name?: string, 
	value?: TValue, 
	onValueChange?: ( value: any ) => void, 
	disabled?: boolean,
	error?: string | boolean | undefined | null,
	validators?: (InputValidationHandler | undefined)[] | undefined,
	inputSize?: InputSize | undefined
}
