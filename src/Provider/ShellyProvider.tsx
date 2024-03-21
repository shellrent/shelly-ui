import { PropsWithChildren, ReactElement, createContext, useEffect, useState } from "react";
import React from "react";
import { TableButtonsOrientation } from "../Table";
import { i18n as I18NType } from "i18next";
import i18n from "../i18n";
import { TooltipProps } from "../Tooltip/Tooltip";

export type ShellyConfig = {
	lang?: string

	// spinner element used on loading of various component
    spinnerElement?: ReactElement

	// callback used to navigate between pages
	navigateCallback?: () => ( path: string ) => void
	
	
	tables?: {
		headerGroups?: {
			additionalClasses?: string
		}

		headers?: {
			additionalClasses?: string
		}

		cells?: {	
			additionalClasses?: string
		}

		defaultColumn?: {
			size?: number
			minSize?: number
			maxSize?: number
		},

		buttonsOrientation?: TableButtonsOrientation

		buttonsTooltipOrientation?: TooltipProps['orientation']
	}

	i18n?: I18NType
}

type ShellyProviderProps = {
    config: ShellyConfig,
} & PropsWithChildren

export const ShellyContext = createContext<ShellyConfig | null>( null );

const ShellyProvider: React.FC<ShellyProviderProps> = ( {config, children} ) => {
	if ( config && !config.i18n ) {
		config.i18n = i18n;
	}

	if ( config && !config.lang ) {
		config.lang = 'en';
	}
	
	const [value, setValue] = useState( config );

	useEffect( () => {
		setValue( config );
	}, [config] );

	return <ShellyContext.Provider value={value}>
		{children}
	</ShellyContext.Provider>;
};

export default ShellyProvider;