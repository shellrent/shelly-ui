import React, { PropsWithChildren } from "react";
import Button from "../Button";
import { ButtonProps } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus, faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../Tooltip";
import { useNavigate } from "../hooks/useNavigate";

type TableButtonsProps = PropsWithChildren

const TableButtons: React.FC<TableButtonsProps> = ({children}) => {
	return <div className="w-full flex justify-end gap-2">
		{children}
	</div>;
};

type TableButtonProviderProps = {
	to?: string 
} & ButtonProps;

type TableButtonProps = {
	to?: string
} & Omit<ButtonProps, "buttonType" | "outline" | "size">

const ButtonProvider: React.FC<TableButtonProviderProps> = ( {children, onClick, to, ...props}: TableButtonProviderProps ) => {
	const navigate = useNavigate();

	return <Button {...props} onClick={  (e) =>{
		if ( to ) {
			navigate( to );
			return;
		}

		if ( onClick ) {
			onClick(e);
		}
	} } >
		{children}
	</Button>;
};

const Edit: React.FC<TableButtonProps> = ( {...props} ) => {
	return <Tooltip title="Modifica">
		<ButtonProvider {...props} buttonType="primary" size="sm" outline>
			<FontAwesomeIcon icon={faPencil}/>
		</ButtonProvider>
	</Tooltip>;
};

const Delete: React.FC<TableButtonProps> = ( {...props} ) => {
	return <Tooltip title="Elimina">
		<ButtonProvider {...props} buttonType="error" size="sm" outline>
			<FontAwesomeIcon icon={faTimes}/>
		</ButtonProvider>
	</Tooltip>;
};

const Info: React.FC<TableButtonProps> = ( {...props} ) => {
	return <Tooltip title="Dettagli">
		<ButtonProvider {...props} buttonType="info" size="sm" outline>
			<FontAwesomeIcon icon={faMagnifyingGlassPlus}/>
		</ButtonProvider>
	</Tooltip>;
};

export default Object.assign( TableButtons,  {
	Edit,
	Delete,
	Info
} );