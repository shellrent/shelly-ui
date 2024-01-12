import { useContext } from "react";
import { ShellyConfig } from "..";
import { ShellyContext } from "../Provider/ShellyProvider";

const useShellyContext = (): ShellyConfig => {
	return useContext( ShellyContext );
};

export const useNavigate = (): ( path: string ) => void  => {
	const config = useShellyContext();

	if ( !config.navigateCallback ) {
		throw Error( 'navigateCallback must be provided in ShellyProvider.' );
	}

	return (path) => {
		if ( config.navigateCallback ) {
			config.navigateCallback()( path );
		}
	};
};