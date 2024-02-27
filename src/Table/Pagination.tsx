import React, { createRef, useEffect } from "react";
import Join from "../Join";
import Button from "../Button";
import Input from "../Input";
import { Table } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Select } from "../Select";
import { useTranslation } from "../i18n";

type PaginationProps<T = any> = {
	table: Table<T>
}

const Pagination: React.FC<PaginationProps> = ({ table }) => {
	const {t} = useTranslation();
	const ref = createRef<HTMLInputElement>();

	useEffect(() => {
		if (ref.current) {
			ref.current.value = String(table.getState().pagination.pageIndex + 1);
		}
	}, [table.getState()]);

	const onInputBlur = () => {
		if (ref.current) {
			ref.current.value = String(table.getState().pagination.pageIndex + 1);
		}
	};

	const setPageIndex = (value: string | null) => {
		if (!value?.length) {
			return;
		}

		table.setPageIndex(Number(value) - 1);
	};

	return <div className="flex w-full justify-between items-center">
		<span className="text-base-content/50 text-sm">
			{t( 'tables:total_count_label', {total: table.getPageCount()} )}
		</span>

		<Join>
			<Button
				buttonType="primary"
				className="join-item"
				size="sm"
				onClick={() => {
					table.setPageIndex(0);
					if (ref.current) {
						ref.current.value = String(table.getState().pagination.pageIndex);
					}
				}}
				disabled={!table.getCanPreviousPage()}
			>
				<FontAwesomeIcon icon={faAnglesLeft} />
			</Button>
			<Button
				buttonType="primary"
				className="join-item"
				size="sm"
				onClick={() => {
					table.previousPage();
					if (ref.current) {
						ref.current.value = String(table.getState().pagination.pageIndex);
					}
				}}
				disabled={!table.getCanPreviousPage()}
			>
				<FontAwesomeIcon size="sm" icon={faChevronLeft} />
			</Button>
			<Input
				ref={ref}
				className="join-item w-20 text-center focus:outline-none"
				defaultValue={table.getState().pagination.pageIndex + 1}
				inputSize="sm"
				onValueChange={setPageIndex}
				onBlur={onInputBlur}
			/>
			<Button
				buttonType="primary"
				className="join-item"
				onClick={() => {
					table.nextPage();
					if (ref.current) {
						ref.current.value = String(table.getState().pagination.pageIndex + 2);
					}
				}}
				disabled={!table.getCanNextPage()}
				size="sm"
			>
				<FontAwesomeIcon size="sm" icon={faChevronRight} />
			</Button>
			<Button
				buttonType="primary"
				className="join-item"
				size="sm"
				onClick={() => {
					table.setPageIndex(table.getPageCount() - 1);
					if (ref.current) {
						ref.current.value = String(table.getState().pagination.pageIndex);
					}
				}}
				disabled={!table.getCanNextPage()}
			>
				<FontAwesomeIcon icon={faAnglesRight} />
			</Button>
		</Join>

		<Select inputSize="sm" value={ String( table.getState().pagination.pageSize ) } options={[ 10, 20, 50, 100 ].map( v => ({ value: v, title: String( v ) }) )} onValueChange={( table.setPageSize )}/>
	</div>;
};

export default Pagination;