import clsx from "clsx";
import React, { HTMLAttributes, PropsWithChildren } from "react";
type DrawerProps = {
    responsive?: boolean
} & PropsWithChildren & HTMLAttributes<HTMLDivElement>

const Drawer: React.FC<DrawerProps> = ( {className, children, responsive, ...props} ) => {
	const classNames = clsx(
		'drawer',
		responsive && 'lg:drawer-open',
		className
	);

	return <div {...props} className={classNames}>
		<input id="drawer" type="checkbox" className="drawer-toggle" />
		{children}
	</div>;
};

type ToggleProps = PropsWithChildren & HTMLAttributes<HTMLLabelElement>
const Toggle: React.FC<ToggleProps> = ( {children, className, ...props} ) => {
	const classNames = clsx( 
		'drawer-button btn btn-ghost',
		className
	);

	return <label {...props} htmlFor="drawer" className={classNames}>
		{children}
	</label>;
};

type ContentProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

const Content: React.FC<ContentProps> = ( {className, children, ...props} ) => {
	const classNames = clsx(
		'drawer-content',
		className
	);

	return <div {...props} className={classNames}>
		{children}
	</div>;
};

type SideProps = PropsWithChildren

const Side: React.FC<SideProps> = ( {children, ...props} ) => {
	return <div className="drawer-side">
		<label htmlFor="drawer" className="drawer-overlay"></label> 
		{children}
	</div>;
};

export default Object.assign( Drawer, {
	Content,
	Toggle,
	Side
} );