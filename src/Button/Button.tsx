import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import {twMerge} from 'tailwind-merge';
import {clsx} from 'clsx';
import { swtc } from '../utils';


type ButtonType = 'neutral' |'primary' |'secondary' |'accent' |'info' |'success' |'warning' |'error' |'ghost' |'link' |'outline' |'active' |'disabled' ;

export type ButtonProps = {
    buttonType?: ButtonType | undefined
    outline?: boolean
    size?: 'sm' | 'lg' | 'xs'
	wide?: boolean
	loading?: boolean | undefined
} & ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren

const Button: React.FC<ButtonProps> = ( {children, buttonType, wide, outline, size, className, loading, ...props}: ButtonProps ) => {
	const classNames = twMerge(
		'btn',
		clsx(
			outline && 'btn-outline',
			wide && 'btn-wide',
			size && swtc( size, {
				sm: 'btn-sm',
				lg: 'btn-lg',
				xs: 'btn-xs',
			} ),
			buttonType && swtc( buttonType, {
				neutral: 'btn-neutral',
				primary: 'btn-primary',
				secondary: 'btn-secondary',
				accent: 'btn-accent',
				info: 'btn-info',
				success: 'btn-success',
				warning: 'btn-warning',
				error: 'btn-error',
				ghost: 'btn-ghost',
				link: 'btn-link',
				outline: 'btn-outline',
				active: 'btn-active',
				disabled: 'btn-disabled',
			} ),
		),
		className,
	);

	return <button 
		className={classNames}
		{...props} 
	>
		{loading && <span className="loading loading-spinner"/>}
		{children}
	</button>;
};

export default Button;

