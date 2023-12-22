import { useContext } from "react";
import { ShellyContext } from "../Provider/ShellyProvider";
import React from 'react';

const Spinner: React.FC = () => {
	const config = useContext( ShellyContext );


	if ( config?.spinnerElement ) {
		return config.spinnerElement;
	}

	return <div 
		className="absolute flex justify-center items-center z-20 w-full h-full  rounded-box"
		style={{background: 'radial-gradient(circle,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 60%)'}}
	>
		<span className="loading loading-ring loading-lg">
		</span>
	</div>;
}; 


export default Spinner;