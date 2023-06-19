import React, { HTMLAttributes, PropsWithChildren, useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {faCheck, faCircleXmark, faTimes, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

type AlertType = 'success' | 'warning' | 'error';

type AlertProps = {
    type?: AlertType | undefined
    icon?: IconProp | undefined
	showCloseButton?: boolean
} & HTMLAttributes<HTMLElement> & PropsWithChildren;

type AlertConfiguration = {
    icon: IconProp,
    class: string
}

const alertConfiguration: { [key in AlertType]: AlertConfiguration } = {
	success: {
		class: 'alert-success',
		icon: faCheck
	},
	error: {
		class: 'alert-error',
		icon: faCircleXmark
	},
	warning: {
		class: 'alert-warning',
		icon: faTriangleExclamation
	}
};

const Alert: React.FC<AlertProps> = ( {children, className, icon, type, showCloseButton, ...props}: AlertProps ) => {   
	const [show, setShow] = useState<boolean>( true );
    
	if ( !icon && type ) {
		icon = alertConfiguration[type].icon;
	}
    
	const classNames = twMerge(
		className,
		'alert',
		clsx(
			type && alertConfiguration[type].class,
		),
	);

	return <>
		{ show && 
		<div 
			{...props}
			className={classNames}
		>   
			<div>{ icon && <FontAwesomeIcon icon={icon} size="xl"/> }</div>
			<div>{children}</div>
			{ showCloseButton && <Button className="align-end" buttonType="ghost" type="button" onClick={() => {setShow(false);}}> <FontAwesomeIcon icon={faTimes}/> </Button> }
		</div>
		}
	</>;
};

type TitleProps = HTMLAttributes<HTMLHeadingElement> & PropsWithChildren

const Title: React.FC<TitleProps> = ( {children, ...props}: TitleProps ) => {
	return <h2 {...props} className="text-xl font-semibold">
		{children}
	</h2>;
};

export default Object.assign( Alert, {
	Title
} );