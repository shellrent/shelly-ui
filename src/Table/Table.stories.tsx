import type { Meta, StoryObj } from '@storybook/react';
import BasicTable from './BasicTable';
import useTable from './useTable';
import ShellyProvider from '../Provider';
import React, { useState } from 'react';
import FilteredTable from './FilteredTable';
import { useForm } from '../Form';
import Input from '../Input';
import TableButtons from './TableButtons';
import { ExpandRowColumn } from './Columns';


const meta: Meta<typeof BasicTable> = {
	tags: ['autodocs'],
	component: BasicTable,
	argTypes: {
		zebra: {
			type: 'boolean'
		}
	}
};

export default meta;
type Story = StoryObj<typeof BasicTable>;

export const Basic: Story = {
	args: {
		config: {
			tables: {
				headerGroups: {
					additionalClasses: 'border-base-100 border-2 bg-black text-base-100'
				},

				headers: {
					additionalClasses: 'border-base-100 border-2 bg-base-200'
				},

				cells: {
					additionalClasses: 'border-2 border-base-100'
				},

				footerCells: {
					additionalClasses: 'bg-red-800 border-base-100 border-2 bg-base-200'
				},

				footers: {
					additionalClasses: 'border-base-100 border-2 bg-base-200 bg-black'
				}
			}
		},
		tableData: {
			renderExpandedRow: () => <p> Expanded </p>,
			columns: [
				{
					id: 'akjdbna',
					footer: 'total',
					columns: [						
						ExpandRowColumn,
						{
							header: 'Id',
							accessorKey: 'id',
						},
						{
							accessorKey: 'name'
						}
					]
				},
				{
					header: '',
					accessorKey: 'count'
				}
			],
			data: [
				{
					id: 1,
					name: 'test',
					
					count: 3
				},
				{
					id: 2,
					name: 'test2',
					count: 4
				}
			]
		}
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { table } = useTable(args.tableData);

		return <ShellyProvider config={args.config}>
			<BasicTable {...args} table={table}></BasicTable>
		</ShellyProvider>;
	}
};

export const Filter: Story = {
	args: {
		config: {
			navigateCallback: () => null, 
			tables: {
				headerGroups: {
					additionalClasses: 'border-base-100 border-2 bg-black text-base-100'
				},

				headers: {
					additionalClasses: 'border-base-100 border-2 bg-base-200'
				},

				cells: {
					additionalClasses: 'border-2 border-base-100'
				},
			}
		},
		tableData: {
			pageSize: 10,
			pageCount: 100,
			currentPage: 0,
			columns: [
				{
					header: 'ciao',
					columns: [
						{
							accessorKey: 'id'
						},
						{
							accessorKey: 'name',
							meta: {
								getStyle: (context) => {
									return {
										backgroundColor: context.row.original.color
									};
								}
							}
						}
					]
				},
				{
					accessorKey: 'count'
				},
				{
					id: 'actions',
					cell: () => <TableButtons>
						<TableButtons.Edit tooltipOrientation='left'/>
					</TableButtons>
				}
			],
			data: [
				{
					id: 1,
					name: 'test1',
					color: '#fcba03',
				},
				{
					id: 2,
					name: 'test2',
					color: '#0398fc',
				},
			]
		}
	},
	render: (args) => {
		const [page, setPage] = useState(0);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { table } = useTable({ 
			...args.tableData,
			currentPage: page
		});
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const form = useForm({
			type: 'filter'
		});

		return <ShellyProvider config={args.config}>
			<Input onValueChange={ setPage } />

			<FilteredTable table={table} {...args}>
				<FilteredTable.FilterForm form={form}>
					<FilteredTable.FilterField>
						<Input placeholder="test" {...form.registerInput({name: 'test'})} />
					</FilteredTable.FilterField>
				</FilteredTable.FilterForm>
			</FilteredTable>
		</ShellyProvider>;
	}
};