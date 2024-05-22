import React, { CSSProperties, Fragment, useMemo } from "react";
import { CellContext, RowData, flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { TableObject } from "./useTable";
import { useShellyContext } from "../Provider";
import { useTranslation } from "../i18n";

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        getStyle: (context: CellContext<TData, TValue>) => CSSProperties | void
    }
}

type BasicTableProps<T extends RowData = any> = {
    table: TableObject<T>
	zebra?: boolean
	className?: string
}

const BasicTable: React.FC<any> = <T,>( {table, zebra, className, ...props}: BasicTableProps<T> ) => {
	const config = useShellyContext();
	const {t} = useTranslation();

	const classNames = twMerge( 
		className,
		'table',
		clsx(
			zebra === false ? '' : 'table-zebra'
		)
	);

	const tb = useMemo( () => <table className={classNames}>
		<thead>
			{table.getHeaderGroups()
				.filter( ( headerGroup ) => headerGroup.headers
					.filter( h  => {
						return !_.isEmpty( h.column.columnDef.header );
					} ).length > 0 )
				.map(headerGroup => (
					<tr 
						key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<th 
									key={header.id} 
									colSpan={header.colSpan}
									className={ 
										header.getLeafHeaders().length > 1 ? 
											config.tables?.headerGroups?.additionalClasses :
											config.tables?.headers?.additionalClasses 
									}
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
			{table.getRowModel().rows.length ? table.getRowModel().rows.map(row => {
				return (
					<Fragment key={row.id}>
						<tr >
							{row.getVisibleCells().map(cell => {
								const meta = cell.getContext().cell.column.columnDef.meta;

								const style = {
									...meta?.getStyle(cell.getContext()),
									width: cell.column.getSize()
								};

								return (
									<td 
										key={cell.id}
										style={style}
										className={config.tables?.cells?.additionalClasses}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								);
							})}
						</tr>
						{row.getIsExpanded() && <tr>
							<td colSpan={row.getVisibleCells().length}>
								{table.renderExpandedRow( row )}
							</td>
						</tr>
						}
					</Fragment>
				);
			}) : <tr>
				<td colSpan={table.getAllLeafColumns().length} className="text-center font-semibold text-base-content/70">
					{t( 'tables:empty_body_label' ) }
				</td>
			</tr> }
		</tbody>
		<tfoot>
			{table.getFooterGroups()
				.filter( ( footerGroup ) => footerGroup.headers
					.filter( h  => {
						return Boolean( h.column.columnDef.footer );
					} ).length > 0 )
				.map(footerGroup => (
					<tr key={footerGroup.id}>
						{footerGroup.headers
							.map(header => (
								<th key={header.id} 
									colSpan={header.colSpan}
									className={
										config.tables?.footerCells?.additionalClasses 
									}
								>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.footer,
											header.getContext()
										)}
								</th>
							))}
					</tr>
				))}
		</tfoot>
	</table>, [table.getRowModel(), table.getAllColumns(), table.loading] );
	
	return <div className="overflow-x-auto">
		<div className="inline-block min-w-full ">
			{tb}
		</div>
	</div>;
};

export default BasicTable;