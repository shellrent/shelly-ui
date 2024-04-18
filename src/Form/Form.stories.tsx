import type { Meta, StoryObj } from '@storybook/react';
import Form from './Form';
import useForm from './useForm';
import { Button, Checkbox, Input, InputValidationHandler, Select, ShellyProvider, TextEditor, Toggle } from '..';
import React, { useEffect } from 'react';
import { validators } from '..';

const meta: Meta<typeof Form> = {
	tags: ['autodocs'],
	component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const form = useForm();

		const validateRepeatPassword: InputValidationHandler = (value, formData) => {
			const repeat = form.state.formValues?.getFormValue('password');

			if (!repeat) {
				return null;
			}

			if (repeat && !value) {
				return 'E\' necessario ripetere la password.';
			}

			if (value !== repeat) {
				return 'Le due password non corrispondono';
			}

			return null;
		};

		const validatePassword: InputValidationHandler = (value: any) => {
			return null;

			const err = validators.minCharacters(8, 'La Password deve contenere almeno 8 caratteri')(value);

			if (err) {
				return err;
			}

			return validators.isRequired('La password è richiesta')(value);
		};

		useEffect( () => {
			form.setFormValues({
				select: false,
				editor: 'editor content',
				toggle: true,
			});
		}, [] );

		return <ShellyProvider config={{}}>
			<Form form={form} saveForm={(data) => {
				console.log(data);
				return true;
			}}>
				<Input.FormControl>
					<Input.Label>Password</Input.Label>
					<Input {...form.registerInput({ name: 'password', validators: [validatePassword] })} />
				</Input.FormControl>
				<Input.FormControl>
					<Input.Label>Test</Input.Label>
					<Input {...form.registerInput({ name: 'test', validators: [validateRepeatPassword] })} />
				</Input.FormControl>

				<Input.FormControl>
					<Input.Label>Text editor</Input.Label>
					<TextEditor {...form.registerInput({ name: 'editor' })} />
				</Input.FormControl>

				<Input.FormControl>
					<Input.Label>Toggle</Input.Label>
					<Toggle {...form.registerInput({ name: 'toggle' })} />
				</Input.FormControl>

				<Input.FormControl>
					<Input.Label>Toggle 1</Input.Label>
					<Toggle {...form.registerInput({ name: 'toggle1' })} />
				</Input.FormControl>

				<Input.FormControl>
					<Input.Label>Text editor</Input.Label>
					<Select showEmptyOption options={ [{value: true, title: 'true'}, {value: false, title: 'false'}] } {...form.registerInput({ name: 'select' })} />
				</Input.FormControl>

				<Checkbox {...form.registerInput( {name: 'check'} )} />
				<Button onClick={ () => form.resetFormValues()}>
					Reset
				</Button>
				<Button type="submit">
					Save
				</Button>
			</Form >
		</ShellyProvider >;
	}
};