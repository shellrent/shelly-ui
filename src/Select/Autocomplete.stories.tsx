/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ShellyProvider from '../Provider';
import Autocomplete from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
	tags: ['autodoc'],
	component: Autocomplete,
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
	args: {
		value: "1",
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
		const [value, setValue] = useState<string>( args.value );
		const [options, setOptions] = useState( args.options );

		const onQueryChange = (query) => {
			setOptions( args.options.filter( (option) => option.title.includes(query) ) );
		};

		return <ShellyProvider config={{}}>
			<Autocomplete  {...args} 
				value={value} 
				onChange={setValue} 
				options={options}
				onQueryChange={onQueryChange} />
		</ShellyProvider>;
	}
};