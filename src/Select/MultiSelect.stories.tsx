import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ShellyProvider from '../Provider';
import MultiSelect from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
	tags: ['autodoc'],
	component: MultiSelect,
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
	args: {
		showEmptyOption: true,
		value: ["1"],
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
		const [value, setValue] = React.useState( args.value );

		const valid = (val) =>  {
			if ( val.length < 2 ) {
				return 'Must contain at least 2 items';
			}

			return null;
		};

		return <ShellyProvider config={{}}>
			<MultiSelect  {...args} value={value} onChange={setValue} validators={[valid]}  />
		</ShellyProvider>;
	}
};