import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type BasicTableProps<T = any> = {
    table: Table<T>
	zebra?: boolean
}

const BasicTable: React.FC<BasicTableProps> = ( {table, zebra, ...props} ) => {
	const classNames = twMerge( 
		'table',
		clsx(
			zebra === false ? '' : 'table-zebra'
		)
	);
	
	return <div className="overflow-x-auto">
		<div className="inline-block min-w-full ">

			<table className={classNames}>
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
			</table>
		</div>
	</div>;
};

export default BasicTable;