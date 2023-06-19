export const switchClassName = <T extends {[key: string]: string}>( element: keyof T, params: T ): string => {
	return params[element];
};