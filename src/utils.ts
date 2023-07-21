export type ResetInputProps = {
	resetValue?: () => void
}

export const swtc = <T extends {[key: string]: string}>( element: keyof T, params: T ): string => {
	return params[element];
};