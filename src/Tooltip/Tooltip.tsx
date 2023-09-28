import React, { PropsWithChildren } from "react";

type TooltipProps = {
    title: string
} & PropsWithChildren

const Tooltip: React.FC<TooltipProps> = ({children, title}) => {
	return <div className="tooltip" data-tip={title}>
		{children}
	</div>;
};

export default Tooltip;