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
				value: true,
				title: 'true'
			},
			{
				value: false,
				title: 'false'
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