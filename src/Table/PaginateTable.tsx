import React from "react";
import BasicTable from "./BasicTable";
import Pagination from "./Pagination";
import { swtc } from "../utils";
import clsx from "clsx";
import { TableObject } from "./useTable";
import Spinner from "../Spinner/Spinner";
// import Spinner from "../../Spinner";

export type PaginateTableProps<T = any> = {
    table: TableObject
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

	return <div className="relative">
		{ table.loading && <Spinner/>  }
		<BasicTable table={table}/>
		<div className={paginateClassNames}>
			{<Pagination table={table}/>}
		</div>
	</div>;
};

export default PaginateTable;