import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & PropsWithChildren

const Label: React.FC<LabelProps> = ( {children, className, ...props}: LabelProps ) => {
	const classNames = twMerge(
		'label',
		className
	);

	return <label
		className={classNames}
		{...props}
	>
		{ children }
	</label>;
};

export default Label;