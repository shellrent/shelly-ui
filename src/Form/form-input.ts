import { InputValidationHandler } from "..";

export type InputSize = 'xs' | 'sm' | 'lg' | 'md';

export type InputProps = { 
	name: string, 
	value?: string | undefined, 
	onValueChange?: ( value: any ) => void, 
	disabled?: boolean,
	error?: string | boolean | undefined | null,
	validators?: InputValidationHandler[] | undefined,
	inputSize?: InputSize | undefined
}
