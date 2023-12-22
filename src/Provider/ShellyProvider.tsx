import { PropsWithChildren, ReactNode, createContext, useEffect, useState } from "react";
import React from "react";

export type ShellyConfig = {
    spinnerElement?: ReactNode
}

type ShellyProviderProps = {
    config: ShellyConfig,
} & PropsWithChildren

export const ShellyContext = createContext<ShellyConfig | null>( null );

const ShellyProvider: React.FC<ShellyProviderProps> = ( {config, children} ) => {
	const [value, setValue] = useState( config );

	useEffect( () => {
		setValue( config );
	}, [config] );

	return <ShellyContext.Provider value={value}>
		{children}
	</ShellyContext.Provider>;
};

export default ShellyProvider;