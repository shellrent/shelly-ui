import React from "react";
import BasicTable from "./BasicTable";
import Pagination from "./Pagination";
import { swtc } from "../utils";
import clsx from "clsx";
import { TableObject } from "./useTable";
import Spinner from "../Spinner/Spinner";
import { RowData } from "@tanstack/react-table";
export type PaginateTableProps<T extends RowData = any> = {
    table: TableObject<T>
    paginatePosition?: "center" | "left" | "right" | undefined
	className?: string
}

const PaginateTable: React.FC<any> = <T,>( {table, paginatePosition, className}: PaginateTableProps<T> ) => {	
	const paginateClassNames = clsx( 
		paginatePosition && swtc( paginatePosition, {
			center: "justify-center",
			left: "justify-start",
			right: "justify-end"
		} ),
		paginatePosition || "justify-center",
		"mt-4 flex"
	); 

	return <div className="relative">
		{ table.loading && <Spinner/>  }
		<BasicTable table={table} className={className}/>
		<div className={paginateClassNames}>
			{<Pagination table={table}/>}
		</div>
	</div>;
};

export default PaginateTable;