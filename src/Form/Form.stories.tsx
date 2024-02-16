import type { Meta, StoryObj } from '@storybook/react';
import Form from './Form';
import useForm from './useForm';
import {Button, Input, InputValidationHandler} from '..';
import React from 'react';
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

		const validateRepeatPassword: InputValidationHandler = ( value, formData ) => {
			const repeat =form.state.formValues?.getFormValue( 'password' ); 
			
			if ( !repeat ) {
				return null;
			}

			if ( repeat  && !value ) {
				return 'E\' necessario ripetere la password.';
			}
	
			if ( value !== repeat ) {
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

		return <Form form={form} saveForm={() => true}>
			<Input.FormControl>
				<Input.Label>Password</Input.Label>
				<Input {...form.registerInput( {name: 'password', validators: [validatePassword]} )} />
			</Input.FormControl>
			<Input.FormControl>
				<Input.Label>Test</Input.Label>
				<Input {...form.registerInput( {name: 'test', validators: [validateRepeatPassword]} )} />
			</Input.FormControl>
			<Button type="submit">
				Save
			</Button>
		</Form>;
	}
};