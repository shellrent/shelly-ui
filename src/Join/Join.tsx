import React, { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type JoinProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

const Join: React.FC<JoinProps> = ( {children, className, ...props} ) => {
	const classNames = twMerge(
		'join',
		className
	);

	return <div {...props} className={classNames}>
		{children}
	</div>;
};

export default Join;