import { useCallback, useEffect, useState } from "react";

type ParamsObject = { [key: string]: string }

type QueryParamsResult = [
    params: URLSearchParams,
    setQueryParams: (params: URLSearchParams | ParamsObject) => void
]

const isEqual = (prev: URLSearchParams, params: URLSearchParams) => {
	let equals = true;

	prev.sort();
	params.sort();

	if ( params.toString() !== prev.toString() ) {
		return false;
	}

	prev.forEach((val, key) => {
		if (val !== params.get(key)) {
			equals = false;
		}
	});

	return equals;
};

export const useQueryParams = (): QueryParamsResult => {
	const [params, setParams] = useState<URLSearchParams>(new URLSearchParams);

	useEffect(() => {
		if (!document) {
			return;
		}

		const url = new URL(document.URL);
		const queryParams = url.searchParams;

		if (isEqual(queryParams, params)) {
			return;
		}

		setParams(queryParams);
	}, [document.URL]);

	const setQueryParams = useCallback((newParams: URLSearchParams | ParamsObject) => {
		if (!window) {
			return;
		}

		if ( !(newParams instanceof URLSearchParams) ) {
			newParams = new URLSearchParams( newParams );
		}

		newParams.sort();
		params.sort();
        
		if ( params.toString() === newParams.toString() ) {
			return;
		}
        
		const url = new URL(document.URL );
		url.search = newParams.toString();
		window.history.replaceState( {}, 'replace', url.href );
        
		setParams( newParams );
	}, [params]);

	return [
		params,
		setQueryParams
	];
};