import React, { PropsWithChildren, useEffect, useState } from "react";
import PaginateTable, { PaginateTableProps } from "./PaginateTable";
import Form from '../Form';
import Button from "../Button";
import Input from "../Input";
import { FormHandler } from "../Form/useForm";
import _ from "lodash";
import { RowData } from "@tanstack/react-table";
import { useQueryParams } from "../hooks/useQueryParams";
import { useShellyContext } from "../Provider";

const queryFilterKey = 'filters';

type FilteredTableProps<T extends RowData = any> = PaginateTableProps<T> & PropsWithChildren

const FilteredTable: React.FC<any> = <T,>({ children, table, className, hidePagination, ...props }: FilteredTableProps<T>) => {
	return <div>
		{children}
		<PaginateTable table={table} {...props} className={className} hidePagination={hidePagination}/>
	</div>;
};

type FilterFormProps<T = any> = {
	id?: string
	form: FormHandler
	updateAsyncFilters?: (data: T) => Promise<any>
} & PropsWithChildren

const FilterForm: React.FC<FilterFormProps> = ({ children, form, updateAsyncFilters }) => {
	const [loading, setIsLoading] = useState(false);
	const [queryParameters, setQueryParams] = useQueryParams();
	const { i18n } = useShellyContext();

	useEffect(() => {
		form.resetFormValues();
	}, []);

	useEffect(() => {
		if (!queryParameters || !queryParameters.get(queryFilterKey)) {
			return;
		}

		let formValues = {};
		try {
			formValues = JSON.parse( queryParameters.get(queryFilterKey) ?? '{}' );
		} catch {
			return;
		}

		if (_.isEqual( formValues, form.state.formValues.formValues )) {
			return;
		}
		
		form.setFormValues(formValues);

		if (!_.isEmpty(formValues)) {
			saveForm(formValues);
		}
	}, [queryParameters]);

	const saveForm = (formData: any) => {
		const qp = new URLSearchParams;

		if (formData.length !== 0) {
			qp.set( queryFilterKey, JSON.stringify( formData ) );
		}

		setQueryParams(qp);
		if (updateAsyncFilters) {
			setIsLoading(true);
			return updateAsyncFilters(formData)
				.finally(() => setIsLoading(false));
		}

		return true;
	};

	return <div className="relative py-4">
		<Form form={form} saveForm={saveForm}>
			<Form.GridLayout>
				{children}
			</Form.GridLayout>
			<Form.FormButtons>
				<Button size="sm" buttonType="ghost" type="button" outline onClick={() => {
					form.resetFormValues();
					saveForm({});
				}}
				>
					{i18n.t('tables:reset_filter_button_label')}
				</Button>
				<Button size="sm" buttonType="primary" type="submit" loading={loading}>
					{i18n.t('tables:apply_filter_button_label')}
				</Button>
			</Form.FormButtons>
		</Form>
	</div>;
};

type FilterFieldProps = PropsWithChildren

const FilterField: React.FC<FilterFieldProps> = ({ children }) => {
	return <Input.FormControl className="col-span-2">
		{children}
	</Input.FormControl>;
};

export default Object.assign(FilteredTable, {
	FilterForm,
	FilterField
}); 