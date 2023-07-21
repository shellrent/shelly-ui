import React, { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type LayoutProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren

const Grid: React.FC<LayoutProps> = ( {className, children, ...props} ) => {
	const classNames = twMerge(
		'grid grid-cols-12 gap-2 w-full',
		className
	);

	return <div className={classNames}>
		{children}
	</div>;
};

const Layout = {};

export default Object.assign( Layout, {
	Grid,
} );