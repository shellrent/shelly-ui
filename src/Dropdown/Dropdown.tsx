import clsx from "clsx";
import React, { HTMLAttributes, LiHTMLAttributes, PropsWithChildren } from "react";
import { swtc as swc } from "../utils";
import { twMerge } from "tailwind-merge";

type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';

type DropdownProps = {
	position?: DropdownPosition | undefined
} & PropsWithChildren 

const Dropdown: React.FC<DropdownProps> = ({children, position, ...props}) => {
	const classNames = clsx(
		'dropdown',
		'dropdown-end',
		position && swc( position, {
			top: 'droppdown-top',
			bottom: 'dropdown-bottom',
			left: 'dropdown-left',
			right: 'dropdown-right'
		} )
	);
	
	return <div className={classNames}>
		{children}
	</div>;
};

type ButtonProps = HTMLAttributes<HTMLElement> & PropsWithChildren;

const Button: React.FC<ButtonProps> = ({className, children, ...props}) => {
	const classNames = twMerge(
		'm-1 btn btn-ghost',
		className
	);

	return <label tabIndex={0} {...props} className={classNames}>{children}</label>;
};

type Menu = PropsWithChildren;

const Menu: React.FC<Menu> = ( {children} ) => {
	return <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">{children}</ul>;
};

type ItemProps = PropsWithChildren & LiHTMLAttributes<HTMLLIElement> 

const Item: React.FC<ItemProps> = ({children, ...props} ) => {
	return <li {...props}>
		<a>{children}</a>
	</li>;
};

export default Object.assign( Dropdown, {
	Item,
	Button,
	Menu
} );
