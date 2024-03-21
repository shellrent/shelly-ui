import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

type UseLocationHashHandler = {
    hash: string | undefined,
    setHash: (input: string) => void,
    isCurrentHash: (input: string) => boolean
}

const useLocationHash = (): UseLocationHashHandler => {
	const [hash, setCurrentHash] = useState<string | undefined>();

	useEffect(() => {
		const hash = window.location.hash.substring(1);
		setCurrentHash(hash);
	}, []);

	const transformToLowerCase = useCallback((input: string | undefined) => {
		return _.kebabCase(input);
	}, []);

	const setHash = useCallback( (hash: string) => {
		const h = transformToLowerCase(hash);
		setCurrentHash(h);
		window.history.pushState({}, "", `#${h}`);
	}, [] );

	const isCurrentHash = useCallback((input: string) => transformToLowerCase(input) === transformToLowerCase(hash),
		[hash]);

	return {
		hash,
		setHash,
		isCurrentHash
	};
};

export default useLocationHash;