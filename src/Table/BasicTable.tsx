import React, { useMemo } from "react";
import { RowData, flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { TableObject } from "./useTable";

type BasicTableProps<T extends RowData = any> = {
    table: TableObject<T>
	zebra?: boolean
}

const BasicTable: React.FC<any> = <T,>( {table, zebra, ...props}: BasicTableProps<T> ) => {
	const classNames = twMerge( 
		'table',
		clsx(
			zebra === false ? '' : 'table-zebra'
		)
	);

	const tb = useMemo( () => <table className={classNames}>
		<thead>
			{table.getHeaderGroups().map(headerGroup => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map(header => {
						return (
							<th 
								key={header.id} 
								colSpan={header.colSpan}
								style={{
									width: header.getSize()
								}}
							>
								{header.isPlaceholder ? null : (
									<div>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</div>
								)}
							</th>
						);
					})}
				</tr>
			))}
		</thead>
		<tbody>
			{table.getRowModel().rows.map(row => {
				return (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => {
							return (
								<td 
									key={cell.id}
									style={{
										width: cell.column.getSize()
									}}
								>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	</table>, [table.getRowModel(), table.getAllColumns(), table.loading] );
	
	return <div className="overflow-x-auto">
		<div className="inline-block min-w-full ">
			{tb}
		</div>
	</div>;
};

export default BasicTable;