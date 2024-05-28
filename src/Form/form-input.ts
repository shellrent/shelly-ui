import { RefObject } from "react";
import { InputValidationHandler } from "..";

export type InputSize = 'xs' | 'sm' | 'lg' | 'md';

export type InputProps<TValue, V = unknown> = { 
	name?: string, 
	value?: TValue, 
	onValueChange?: ( value: any ) => void, 
	disabled?: boolean,
	error?: string | boolean | undefined | null,
	validators?: (InputValidationHandler<V> | undefined)[] | undefined,
	inputSize?: InputSize | undefined,
	ref: RefObject<HTMLInputElement|HTMLTextAreaElement>
}
