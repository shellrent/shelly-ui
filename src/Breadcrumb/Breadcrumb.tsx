import React, { PropsWithChildren } from "react";

type BreadcrumbProps = PropsWithChildren;

const Breadcrumb: React.FC<BreadcrumbProps> = ( {children} ) => {
	return <div className="text-sm breadcrumbs">
		<ul>
			{children}
		</ul>
	</div>;
};

type ItemProps = PropsWithChildren;

const Item: React.FC<ItemProps> = ( {children} ) => {
	return <li>
		{children}
	</li>;
};

export default  Object.assign( Breadcrumb, {
	Item
} );