import type { Meta, StoryObj } from '@storybook/react';
import BasicTable from './BasicTable';
import useTable from './useTable';
import ShellyProvider from '../Provider';
import { ShellyConfig } from '..';

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

export const Primary: Story = {
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
            }
        },
        tableData: {
            columns: [
                {
                    header: 'ciao',
                    columns: [
                        {
                            accessorKey: 'id'
                        },
                        {
                            accessorKey: 'name'
                        }
                    ]
                },
                {
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
        const { table } = useTable(args.tableData)

        return <ShellyProvider config={args.config}>
            <BasicTable {...args} table={table}></BasicTable>
        </ShellyProvider>
    }
};