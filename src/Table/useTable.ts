import { ColumnDef, PaginationState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export type PaginationChangeHandler = (pageIndex: number, pageCount: number) => void

type UseTableProps<T = any> = {
	data: T[],
	columns: ColumnDef<T>[],
	onPaginationChange?: PaginationChangeHandler,
	pageSize?: number
	pageCount?: number
	currentPage?: number
}

const useTable = <T = any>({ data, columns, onPaginationChange, pageSize, pageCount, currentPage }: UseTableProps<T>) => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: ( currentPage || 1 ) -1,
		pageSize: pageSize || 10,
	});

	useEffect( () => {
		if ( onPaginationChange ) {
			onPaginationChange(pagination.pageIndex + 1, pagination.pageSize );
		}
	}, [pagination]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
		onPaginationChange: setPagination,
		pageCount: pageCount,
		state: {
			pagination: pagination
		},
		manualPagination: true,
		manualFiltering: true
	});



	return { table, };
};

export default useTable;