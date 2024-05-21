import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ColumnDef } from "..";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const ExpandRowColumn: ColumnDef<any, any> = {
	id: 'expand',
	size: 0,
	cell: ( {row} ) => {
		if ( !row.getCanExpand() ) return <></>;

		return <button 
			onClick={ row.getToggleExpandedHandler() }
		>
			<FontAwesomeIcon icon={faChevronRight} className={ `transition-all ${ row.getIsExpanded() ? 'rotate-90' : '' }` }/>
		</button>;
	}
};