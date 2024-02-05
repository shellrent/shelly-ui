import type { Meta, StoryObj } from '@storybook/react';
import Form from './Form';
import useForm from './useForm';
import {Button, Input} from '..';
import React from 'react';
import { validators } from '..';

const meta: Meta<typeof Form> = {
	tags: ['autodocs'],
	component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const form = useForm();

		return <Form form={form} saveForm={() => true}>
			<Input.FormControl>
				<Input.Label>Test</Input.Label>
				<Input {...form.registerInput( {name: 'test', disable: false, validators: [validators.isUrl( 'required' )]} )} />
			</Input.FormControl>
			<Button type="submit">
				Save
			</Button>
		</Form>;
	}
};