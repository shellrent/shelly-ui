import React, { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type DescriptionListProps = HTMLAttributes<HTMLDListElement> & PropsWithChildren

const DescriptionList: React.FC<DescriptionListProps> = ( { className, children, ...props } ) => {
	const classNames = twMerge( 
		'divide-y divide-base-200',
		className
	);

	return <dl className={classNames} {...props}>
		{children}
	</dl>;
};

const Item: React.FC<PropsWithChildren> = ( {children} ) => {
	return <div className="flex md:flex-row flex-col py-2 md:items-center">
		{children}
	</div>;
};

const ItemTitle: React.FC<PropsWithChildren> = ( {children} ) => {
	return <dt className="mb-1 flex-1">
		{children}
	</dt>;
};

const ItemContent: React.FC<PropsWithChildren> = ( {children} ) => {
	return <dd className="flex-1 text-lg font-semibold">
		{children}
	</dd>;
};

export default Object.assign( DescriptionList, {
	Item,
	ItemTitle,
	ItemContent,
});