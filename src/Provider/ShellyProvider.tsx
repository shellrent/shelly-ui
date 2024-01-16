import { PropsWithChildren, ReactElement, createContext, useEffect, useState } from "react";
import React from "react";
import { TableButtonsOrientation } from "../Table";

export type ShellyConfig = {
	// spinner element used on loading of various component
    spinnerElement?: ReactElement

	// callback used to navigate between pages
	navigateCallback?: () => ( path: string ) => void
	
	
	tables?: {
		buttonsOrientation?: TableButtonsOrientation
	} 
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