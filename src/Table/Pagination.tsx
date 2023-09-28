import React, { createRef } from "react";
import Join from "../Join";
import Button from "../Button";
import Input from "../Input";
import { Table } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type PaginationProps<T = any> = {
	table: Table<T>

}

const Pagination: React.FC<PaginationProps> = ( {table} ) => {
	const ref = createRef<HTMLInputElement>();
	
	const onInputBlur = () => {
		if ( ref.current ) {
			ref.current.value = String( table.getState().pagination.pageIndex + 1 ) ;
		}
	};

	const setPageIndex = ( value: string | null ) => {
		if ( !value?.length ) {
			return;
		}

		table.setPageIndex( Number( value ) - 1  );
	};
	
	return <Join>
		<Button 
			buttonType="primary" 
			className="join-item" 
			size="sm"
			onClick={ () => {
				table.previousPage();
				if ( ref.current ) {
					ref.current.value = String( table.getState().pagination.pageIndex ) ;
				}
			} }
			disabled={ !table.getCanPreviousPage() } 
		>
			<FontAwesomeIcon size="sm" icon={faChevronLeft}/>
		</Button>
		<Input 
			ref={ref} 
			className="join-item w-20 text-center focus:outline-none" 
			defaultValue={table.getState().pagination.pageIndex + 1} 
			inputSize="sm" 
			onValueChange={ setPageIndex } 
			onBlur={onInputBlur}
		/>
		<Button 
			buttonType="primary" 
			className="join-item" 
			onClick={ () => {
				table.nextPage();
				if ( ref.current ) {
					ref.current.value = String( table.getState().pagination.pageIndex + 2 ) ;
				}
			} } 
			disabled={ !table.getCanNextPage() } 
			size="sm"
		>
			<FontAwesomeIcon size="sm" icon={faChevronRight}/>
		</Button>
	</Join>;
};

export default Pagination;