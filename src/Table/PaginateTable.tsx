import React from "react";
import { Table } from "@tanstack/react-table";
import BasicTable from "./BasicTable";
import Pagination from "./Pagination";
import { swtc } from "../utils";
import clsx from "clsx";

export type PaginateTableProps<T = any> = {
    table: Table<T>
    paginatePosition?: "center" | "left" | "right" | undefined
}

const PaginateTable: React.FC<PaginateTableProps> = ( {table, paginatePosition} ) => {
	const paginateClassNames = clsx( 
		paginatePosition && swtc( paginatePosition, {
			center: "justify-center",
			left: "justify-start",
			right: "justify-end"
		} ),
		paginatePosition || "justify-center",
		"mt-4 flex"
	);

	return <div>
		{/* <span className="my-4 text-sm">Elementi totali: {table.getPageCount() }</span> */}
		<BasicTable table={table}/>
		<div className={paginateClassNames}>
			<Pagination table={table}/>
		</div>
	</div>;
};

export default PaginateTable;