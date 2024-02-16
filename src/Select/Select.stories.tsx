import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import React from 'react';
import ShellyProvider from '../Provider';

const meta: Meta<typeof Select> = {
	tags: ['autodoc'],
	component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	args: {
		showEmptyOption: true,
		options: [
			{
				value: '1',
				title: 'Option 1'
			},
			{
				value: '2',
				title: 'Option 2'
			},
			{
				value: '3',
				title: 'Option 3'
			}
		]
	},
	render: (args) => {
		const [value, setValue] = React.useState();

		const valid = (val) =>  {
			if ( !val ) {
				return 'empty';
			}

			return null;
		};

		return <ShellyProvider config={{}}>
			<Select  {...args} value={value} onChange={setValue} validators={[valid]}  />
		</ShellyProvider>;
	}
};