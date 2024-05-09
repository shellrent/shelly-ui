import React, { FormEvent, PropsWithChildren, useEffect } from "react";
import Alert from "../Alert/Alert";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { swtc } from "../utils";
import { FormHandler } from "./useForm";

type FormProps<T extends object = any> = {
	saveForm: (data: T) => Promise<any> | boolean
	onSuccess?: () => void
	form: FormHandler
} & PropsWithChildren;

const Form: React.FC<FormProps> = <T extends object>({ children, saveForm, form }: FormProps<T>) => {
	useEffect(() => {
		form.resetErrors();
		form.resetFormValues();
		form.resetInputs();
	}, []);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		form.resetErrors();
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data: { [key: string]: any } = {} as T;

		for (const pair of formData.entries()) {
			const key = pair[0];
			const value = pair[1];

			if (!value) {
				continue;
			}

			if (typeof value == 'string' && !value.length) {
				continue;
			}

			if (key.includes('[') && key.includes(']')) {
				const fieldName = key.substring(0, key.indexOf('['));
				const matches = key.match(/\[(.*?)\]/);
				const index = matches ? matches[1] : 0;

				if (!Object.prototype.hasOwnProperty.call(data, fieldName)) {
					data[fieldName] = [];
				}

				data[fieldName][index] = value;
			} else if (key.includes('{') && key.includes('}')) {
				const objFieldName = key.substring(0, key.indexOf('{'));
				const matches = key.match(/\[(.*?)\]/);
				const objKey = matches ? matches[1] : 0;

				if (!Object.prototype.hasOwnProperty.call(data, objFieldName)) {
					data[objFieldName] = {};
				}

				data[objFieldName][objKey] = value;
			} else {
				if (data[key]) {
					if (data[key] instanceof Array) {
						data[key] = [
							...data[key],
							value
						];
					} else {
						data[key] = [
							data[key],
							value
						];
					}
				} else {
					data[key] = value;
				}
			}
		}

		let errors: string[] = [];

		Object.entries(form.state.inputs).map(([key, input]) => {
			const inputValue = formData.get(input.name);

			input.validators.every(validator => {
				if (!validator) {
					return true;	
				}

				const err = validator(inputValue);

				if (err) {
					form.triggerInputError(key);

					errors = [
						...errors,
						err
					];

					return false;
				}

				return true;
			});
		});

		if (errors.length > 0) {
			form.handleFormError(errors);
			return;
		}

		const res = saveForm(data as T);

		form.handleOnSubmitted(res);
	};

	return <form
		ref={form.ref}
		onSubmit={onSubmit}
		className="flex flex-col gap-4"
	>
		{form.state.formErrors.hasErrors() &&
			<Alert type="error" className="" showCloseButton={true}>
				<div>
					<Alert.Title>
						Error
					</Alert.Title>
					<ul>
						{
							form.state.formErrors.getErrors().map((error, key) => {
								return <li key={key}> {error} </li>;
							})
						}
					</ul>
				</div>
			</Alert>
		}
		{children}
	</form>;
};

type GridLayoutProps = PropsWithChildren;

const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
	return <div className="grid grid-cols-4 lg:grid-cols-12 my-4 gap-4">{children}</div>;
};


type FormButtonsAlign = 'left' | 'center' | 'right';

type FormButtonsProps = {
	align?: FormButtonsAlign | undefined
} & PropsWithChildren

const FormButtons: React.FC<FormButtonsProps> = ({ children, align }) => {
	if (!align) {
		align = 'right';
	}

	const classNames = twMerge(
		'ml-auto',
		'max-w-fit',
		'grid grid-flow-col gap-2',
		clsx(
			align && swtc(align, {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right',
			}),
		)
	);

	return <div className={classNames}>{children}</div>;
};

export default Object.assign(Form, {
	GridLayout,
	FormButtons
});


