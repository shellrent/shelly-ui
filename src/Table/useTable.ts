import { ColumnDef, PaginationState, Row, RowData, Table, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShellyContext } from "../Provider";

export type PaginationChangeHandler = (pageIndex: number, pageCount: number) => Promise<any>

type UseTableProps<T = any> = {
	data: T[],
	columns: ColumnDef<T>[],
	onPaginationChange?: PaginationChangeHandler,
	pageSize?: number
	pageCount?: number
	currentPage?: number
	renderExpandedRow?: (row: Row<T>) => JSX.Element | null
}

export type TableObject<T = any> = Table<T> & { 
	loading: boolean,
	renderExpandedRow?: (row: Row<T>) => JSX.Element | null
}

const useTable = <T extends RowData = any>({ data, columns, onPaginationChange, pageSize, pageCount, currentPage, renderExpandedRow }: UseTableProps<T>): { table: TableObject<T> } => {
	const config = useShellyContext();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: (currentPage || 1) - 1,
		pageSize: pageSize || 10,
	});

	const prevPagination = useRef<PaginationState>(pagination);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setPagination({
			pageIndex: (currentPage || 1) - 1,
			pageSize: pageSize || 10,
		});
	}, [currentPage, pageSize]);

	useEffect(() => {
		if (onPaginationChange &&
			(prevPagination.current.pageIndex !== pagination.pageIndex || prevPagination.current.pageSize !== pagination.pageSize)) {
			setLoading(true);
			onPaginationChange(pagination.pageIndex + 1, pagination.pageSize)
				.finally(() => setLoading(false));
		}

		prevPagination.current = pagination;
	}, [pagination, onPaginationChange]);

	const cols = useCallback<() => ColumnDef<T>[]>( () => columns, [columns] );

	const table = useReactTable({
		data,
		columns: cols(),
		getRowCanExpand: ( row: Row<T> ) => renderExpandedRow ? renderExpandedRow( row ) !== null : false,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		debugTable: false,
		onPaginationChange: setPagination,
		pageCount: pageCount,
		state: {
			pagination: pagination
		},
		manualPagination: true,
		manualFiltering: true,
		defaultColumn: {
			size: config?.tables?.defaultColumn ? config.tables.defaultColumn.size : 200,
			minSize: config?.tables?.defaultColumn ? config.tables.defaultColumn.minSize : 0,
			maxSize: config?.tables?.defaultColumn ? config.tables.defaultColumn.maxSize : 500,
		},
	});

	return { table: Object.assign(table, { loading: loading, renderExpandedRow: renderExpandedRow }) } as { table: TableObject<T> };
};


export default useTable;