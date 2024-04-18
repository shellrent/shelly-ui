import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { swtc } from "../utils";
import clsx from "clsx";

export type TooltipProps = {
    title: string
	orientation?: 'bottom' | 'right' | 'left' | 'top',
	forceOpen?: boolean
} & PropsWithChildren

const Tooltip: React.FC<TooltipProps> = ({children, title, orientation, forceOpen}) => {
	const classNames = twMerge(
		'tooltip',
		clsx(
			forceOpen && 'tooltip-open',
			orientation && swtc( orientation, {
				bottom: 'tooltip-bottom',
				top: 'tooltip-top',
				left: 'tooltip-left',
				right: 'tooltip-right',
			} )
		)
	);

	return <div className={classNames} data-tip={title}>
		{children}
	</div>;
};

export default Tooltip;