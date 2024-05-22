import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { createColumnHelper } from "@tanstack/react-table";

export const ExpandRowColumn = createColumnHelper().display(
	{
		id: 'expand',
		size: 0,
		cell: ({ row }) => {
			if (!row.getCanExpand()) return <></>;

			return <button
				onClick={row.getToggleExpandedHandler()}
			>
				<FontAwesomeIcon icon={faChevronRight} className={`transition-all ${row.getIsExpanded() ? 'rotate-90' : ''}`} />
			</button>;
		}
	}); 
