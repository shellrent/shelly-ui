import React, { ChangeEvent, InputHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { InputProps } from "../Form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import FieldError from "../Common/FieldError";

type ToggleProps = InputProps<boolean, boolean> & InputHTMLAttributes<HTMLInputElement>

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({ value, className, onValueChange, inputSize, error, ...props }, ref) => {
	const [checked, setChecked] = useState<boolean>(value ?? false);
	const [err, setError] = useState<string | boolean | undefined>(false);

	useEffect(() => {
		if (typeof error == 'string') {
			setError(error);

			return;
		}

		setError(Boolean(error));
	}, [error]);

	const classNames = twMerge(
		'toggle',
		clsx(
			checked && 'toggle-accent',
			err && 'toggle-error',
		),
		className
	);

	useEffect(() => {
		setChecked(value ?? false);
	}, [value]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const val = event.target.checked;

		if (onValueChange) {
			onValueChange(val);
		}

		setChecked(val);
	};

	return <>
		<input
			{...props}
			ref={ref}
			type="checkbox"
			className={classNames}
			onChange={onChange}
			checked={checked}
		/>
		<FieldError error={err}></FieldError>
	</>;
} );

Toggle.displayName = 'Toggle';

export default Toggle;