import React, { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type LayoutProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren

const Grid: React.FC<LayoutProps> = ( {className, children, ...props} ) => {
	const classNames = twMerge(
		'grid grid-cols-6 md:grid-cols-12 gap-8 w-full',
		className
	);

	return <div className={classNames}>
		{children}
	</div>;
};


const Flex: React.FC<LayoutProps> = ( {className, children, ...props} ) => {
	const classNames = twMerge(
		'flex content-stretch flex-wrap items-start gap-8 w-full',
		className
	);

	return <div className={classNames}>
		{children}
	</div>;
};

const Layout = {};


export default Object.assign( Layout, {
	Grid,
	Flex
} );