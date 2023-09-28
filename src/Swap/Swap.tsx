import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SwapProps = {
    onValueChange: ( val: boolean ) => void
    className?: string
} & PropsWithChildren

const Swap: React.FC<SwapProps> = ( {children, onValueChange, className}) => {
	const classNames = twMerge(
		'swap swap-rotate',
		className
	);
	return <label className={classNames}>
		<input type="checkbox" onChange={( e ) => {
			const val = e.target.checked;

			onValueChange( Boolean(val) );
		}}/>
		{children}
	</label>;
};


const On: React.FC<PropsWithChildren> = ( {children}) => {
	return <span className="swap-on fill-current">
		{children}
	</span>;
};

const Off: React.FC<PropsWithChildren> = ( {children} ) => {
	return <span className="swap-off fill-current">
		{children}
	</span>;
};

export default Object.assign( Swap, {
	On,
	Off
} );