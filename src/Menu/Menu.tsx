import React, { HTMLAttributes, LiHTMLAttributes, PropsWithChildren, ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

type MenuProps = HTMLAttributes<HTMLUListElement> & PropsWithChildren

const Menu: React.FC<MenuProps> = ( {children, className, ...props} ) => {
	const classNames = twMerge(
		'menu bg-base-100 rounded-box',
		className
	);

	return <ul {...props} className={classNames}>
		{children}
	</ul>;
};

type ItemProps = LiHTMLAttributes<HTMLLIElement> & PropsWithChildren

const Item: React.FC<ItemProps> = ( {children, className, ...props} ) => {
	const classNames = twMerge(
		'mt-1',
		className
	);

	return <li className={classNames} {...props}>
		{children}
	</li>;
};

type CollapsibleItemProps = {
	title: ReactNode
	open?: boolean,
	onToggle?: ( isOpen: boolean ) => void
} & PropsWithChildren;

const CollapsibleItem: React.FC<CollapsibleItemProps> = ( {children, title, open, onToggle} ) => {
	const isOpen = useRef( open );

	return <Item>
		<details open={open} onToggle={ () => {
			isOpen.current = !isOpen.current;	

			if ( onToggle ) {
				onToggle( isOpen.current );
			}

		} } className="active:!bg-transparent active:!text-content transition">
			<summary>{title}</summary>
			<ul className="transition">
				{children}
			</ul>
		</details>
	</Item>;
};

export default Object.assign( Menu, {
	Item,
	CollapsibleItem
} );