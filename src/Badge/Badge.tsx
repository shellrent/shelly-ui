import clsx from "clsx";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import { swtc } from "../utils";

type BadgeProps = {
    badgeType?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | undefined,
    color?: string,
	outline?: boolean
} & HTMLAttributes<HTMLDivElement> & PropsWithChildren

const Badge: React.FC<BadgeProps> = ( {children, className, badgeType, color, outline, ...props} ) =>{
	const classNames = clsx(
		'badge',
		badgeType && swtc( badgeType, {
			neutral: 'badge-neutral',
			primary: 'badge-primary',
			secondary: 'badge-secondary',
			accent: 'badge-accent',
			ghost: 'badge-ghost',
		} ),
		outline && 'badge-outline',
		className,
	);

	return <div className={classNames} style={{backgroundColor: (!outline) ? color : undefined , borderColor: color}} {...props}>
		{children}
	</div>;
};

export default Badge;