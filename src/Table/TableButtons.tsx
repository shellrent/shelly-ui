import React, { PropsWithChildren } from "react";
import Button from "../Button";
import { ButtonProps } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faMagnifyingGlassPlus, faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../Tooltip";
import { useNavigate } from "../hooks/useNavigate";
import clsx from 'clsx';
import { useShellyContext } from "../Provider";
import { twMerge } from "tailwind-merge";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "../i18n";
import { TooltipProps } from "../Tooltip/Tooltip";

export type TableButtonsOrientation = 'left' | 'right' | 'center' | undefined

type TableButtonsProps = {
	orientation?: TableButtonsOrientation
} & PropsWithChildren

type BasicTableButtonProps = {
	tooltip: string,
	icon: IconDefinition,
	buttonType: ButtonProps['buttonType']
}

const TableButtons: React.FC<TableButtonsProps> = ({ children, orientation }) => {
	const config = useShellyContext();

	if (orientation === undefined) {
		orientation = config?.tables?.buttonsOrientation;
	}

	const classNames = twMerge(
		'w-full flex gap-2',
		clsx(
			orientation == 'left' && 'justify-start',
			orientation == 'right' && 'justify-end',
			orientation == 'center' && 'justify-center'
		)
	);

	return <div className={classNames}>
		{children}
	</div>;
};

type TableButtonProviderProps = {
	to?: string
} & ButtonProps;

type TableButtonProps = {
	to?: string
	tooltipOrientation?: TooltipProps['orientation']
} & Omit<ButtonProps, "buttonType" | "outline" | "size">

const ButtonProvider: React.FC<TableButtonProviderProps> = ({ children, onClick, to, ...props }: TableButtonProviderProps) => {
	const navigate = useNavigate();

	return <Button {...props} onClick={(e) => {
		if (to) {
			navigate(to);
			return;
		}

		if (onClick) {
			onClick(e);
		}
	}} >
		{children}
	</Button>;
};

const Basic: React.FC<TableButtonProps & BasicTableButtonProps> = ({ tooltip, buttonType, icon, tooltipOrientation, ...props }) => {
	const config = useShellyContext();

	if ( tooltipOrientation === undefined && config?.tables?.buttonsTooltipOrientation ) {
		tooltipOrientation = config.tables.buttonsTooltipOrientation;
	}

	return <Tooltip title={tooltip} orientation={tooltipOrientation}>
		<ButtonProvider {...props} buttonType={buttonType} size="sm" outline>
			<FontAwesomeIcon icon={icon} />
		</ButtonProvider>
	</Tooltip>;
};

const Edit: React.FC<TableButtonProps> = ({ ...props }) => {
	const {t} = useTranslation();

	return <Basic 
		tooltip={t("tables:edit_button_label")}
		buttonType="primary"
		icon={faPencil}
		{...props}
	/>;
};

const Delete: React.FC<TableButtonProps> = ({ ...props }) => {
	const {t} = useTranslation();

	return <Basic
		tooltip={t("tables:delete_button_label")}
		buttonType="error"
		icon={faTimes}
		{...props}
	/>;
};

const Info: React.FC<TableButtonProps> = ({ ...props }) => {
	const {t} = useTranslation();

	return <Basic
		tooltip={t("tables:details_button_label")}
		buttonType="info"
		icon={faMagnifyingGlassPlus}
		{...props}
	/>;
};

const EditPassword: React.FC<TableButtonProps> = ({ ...props }) => {
	const {t} = useTranslation();

	return <Basic
		tooltip={t("tables:edit_password_button_label")}
		buttonType="warning"
		icon={faLock}
		{...props}
	/>;	
};

export default Object.assign(TableButtons, {
	Basic,
	Edit,
	Delete,
	Info,
	EditPassword
});
