import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { HTMLAttributes, PropsWithChildren, ReactElement, useState } from "react";
import { twMerge } from "tailwind-merge";

type CollapseProps = {
    defaultOpen?: boolean
    collapseTitle: ReactElement
} & PropsWithChildren & HTMLAttributes<HTMLDivElement>

const Collapse: React.FC<CollapseProps> = ( {collapseTitle, className, children, defaultOpen, ...props} ) => {
	const [open, setOpen] = useState( Boolean( defaultOpen ) );

	const classNames = twMerge(
		'collapse border-2 border-base-200',
		className
	);

	return <div className={classNames} {...props}>
		<input type="checkbox" checked={open} onChange={ (e) => setOpen( e.target.checked ) }/> 
		<div className="collapse-title flex justify-between items-center pr-6"> 
			<div className="font-semibold">{collapseTitle}</div>
			<FontAwesomeIcon icon={ open ? faChevronUp : faChevronDown } />
		</div>
		
		{children}
	</div>;
};

type ContentProps = PropsWithChildren;

const Content: React.FC<ContentProps> = ( {children} ) => {
	return <div className="collapse-content"> 
		{children}
	</div>;
};

export default Object.assign( Collapse, {
	Content
});