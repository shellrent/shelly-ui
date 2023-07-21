import React, { HTMLAttributes, LiHTMLAttributes, PropsWithChildren, ReactNode } from "react";
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

const Item: React.FC<ItemProps> = ( {children, ...props} ) => {
	return <li {...props}>
		{children}
	</li>;
};

type CollapsibleItemProps = {
	title: ReactNode
	open?: boolean
} & PropsWithChildren;

const CollapsibleItem: React.FC<CollapsibleItemProps> = ( {children, title, open} ) => {
	return <Item>
		<details open={open} className="active:!bg-transparent active:!text-content">
			<summary>{title}</summary>
			<ul>
				{children}
			</ul>
		</details>
	</Item>;
};

export default Object.assign( Menu, {
	Item,
	CollapsibleItem
} );