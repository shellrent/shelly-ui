import React, { PropsWithChildren, useEffect, useState } from "react";
import PaginateTable, { PaginateTableProps } from "./PaginateTable";
import Form from '../Form';
import Button from "../Button";
import Input from "../Input";
import { FormHandler } from "../Form/useForm";
import _ from "lodash";
import { RowData } from "@tanstack/react-table";
import { useQueryParams } from "../hooks/useQueryParams";

type FilteredTableProps<T extends RowData = any> = PaginateTableProps<T> & PropsWithChildren

const FilteredTable: React.FC<any> = <T,>( {children, table, ...props}: FilteredTableProps<T>) => {
	return <div>
		{children}
		<PaginateTable table={table} {...props}/>
	</div>;
};

type FilterFormProps<T = any> = {
	id?: string
	form: FormHandler
	updateAsyncFilters?: ( data: T ) => Promise<any>
} & PropsWithChildren

const FilterForm: React.FC<FilterFormProps> = ( {children, id, form, updateAsyncFilters} ) => {
	const [loading, setIsLoading] = useState(false);
	const [queryParameters, setQueryParams] = useQueryParams();

	useEffect( () => {
		if ( !queryParameters ) {
			return;
		}
		
		let formValues = {};
		queryParameters.forEach( ( val, key ) => {
			formValues = {
				...formValues,
				[key]: val
			};	
		} );


		if ( formValues == form.state.formValues ) {
			return;
		}

		form.setFormValues( formValues );

		if ( !_.isEmpty( formValues ) ) {
			saveForm( formValues );
		}
	}, [queryParameters] );
	
	
	const saveForm = ( formData: any ) => {
		const qp = new URLSearchParams;
		
		if ( formData.length !== 0 ) {	
			Object.entries( formData ).map( ([k, v]) => {
				qp.set(k, v as string);
			} );
		}		
		setQueryParams( qp );
		if ( updateAsyncFilters ) {
			setIsLoading( true );
			return updateAsyncFilters( formData )
				.finally( () => setIsLoading(false) );
		}

		return true;
	};

	return <div className="relative py-4">
		<Form form={form} saveForm={ saveForm }>
			<Form.GridLayout>
				{children}
			</Form.GridLayout>
			<Form.FormButtons>
				<Button size="sm" buttonType="ghost" type="button" outline onClick={ () => {
					form.resetFormValues(); 
					saveForm( {} );
				} } 
				>
					Reset
				</Button>
				<Button size="sm" buttonType="primary" type="submit" loading={loading}>
					Applica
				</Button>
			</Form.FormButtons>
		</Form>
	</div>;
};

type FilterFieldProps = PropsWithChildren

const FilterField: React.FC<FilterFieldProps> = ( {children} ) => {
	return <Input.FormControl className="col-span-2">
		{children}
	</Input.FormControl>;
};

export default Object.assign( FilteredTable, {
	FilterForm,
	FilterField
} ); 