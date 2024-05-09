/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
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
		defaultValue: "BS",
	},
	render: (args) => {
		const [value, setValue] = useState<string>(args.value);
		const [options, setOptions] = useState([]);

		useEffect(() => {
			fetch('https://restcountries.com/v3.1/all')
				.then(response => response.json())
				.then(data => setOptions(data.map(m => {
					return {
						title: m.altSpellings[1] || m.altSpellings[0],
						value: m.cca2
					};
				})));
		}, []);

		const onQueryChange = (query) => {
			fetch(`https://restcountries.com/v3.1/name/${query}`)
				.then(response => response.json())
				.then(data => setOptions(data.map(m => {
					return {
						title: m.altSpellings[1] || m.altSpellings[0],
						value: m.cca2
					};
				})));
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