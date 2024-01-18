import { useContext } from "react";
import { ShellyContext } from "./ShellyProvider";
import { ShellyConfig } from ".";

export const useShellyContext = (): ShellyConfig =>{
	return useContext( ShellyContext );
};