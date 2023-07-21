import React, { PropsWithChildren, useState } from "react";
import PaginateTable, { PaginateTableProps } from "./PaginateTable";
import Form from '../Form';
import Button from "../Button";
import Input from "../Input";
import { FormHandler } from "../Form/useForm";

type FilteredTableProps =  PaginateTableProps & PropsWithChildren

const FilteredTable: React.FC<FilteredTableProps> = ( {children, ...props}) => {
	return <div>
		{children}
		<PaginateTable {...props}/>
	</div>;
};

type FilterFormProps<T = any> = {
	id?: string
	form: FormHandler
	updateAsyncFilters?: ( data: T ) => Promise<any>
} & PropsWithChildren

const FilterForm: React.FC<FilterFormProps> = ( {children, id, form, updateAsyncFilters} ) => {
	const [loading, setIsLoading] = useState(false);

	const saveForm = ( formData ) => {
		if ( updateAsyncFilters ) {
			setIsLoading( true );
			return updateAsyncFilters( formData )
				.finally( () => setIsLoading(false) );
		}
	};

	return <div className="relative">
		<Form form={form} saveForm={ saveForm }>
			<Form.GridLayout>
				{children}
			</Form.GridLayout>
			<Form.FormButtons>
				<Button size="sm" buttonType="ghost" type="button" onClick={ () => {form.resetFormValues();} } outline>
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