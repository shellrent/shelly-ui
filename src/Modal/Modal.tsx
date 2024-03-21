import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, memo } from 'react';
import { ModalHandler } from './useModal';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
	modal: ModalHandler
	size?: 'md' | 'xl'
} & PropsWithChildren

const Modal = memo<ModalProps>(({ modal, children, size }) => {
	return <Transition appear show={modal.isOpen} as={Fragment}>
		<Dialog 
			onClose={() => null} 
			as="div" 
			className="modal modal-open text-base-content overflow-y-scroll" >
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-100"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black/25" onClick={() => modal.close()}/>
			</Transition.Child>

			<div className={`modal-box !max-h-none overflow-y-visible max-w-2xl ${size === 'xl' && '!max-w-5xl' }`}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-100"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div>
						{children}
					</div>
				</Transition.Child>
			</div>
		</Dialog>
	</Transition >;
});

Modal.displayName = 'Modal';

type TitleProps = {
	className?: string
} & PropsWithChildren;

const Title: React.FC<TitleProps> = ({ children, className }) => {
	const classNames = twMerge(
		'text-xl font-semibold mb-2',
		className
	);
	return <Dialog.Title className={classNames}>
		{children}
	</Dialog.Title>;
};

type ActionsProps = PropsWithChildren;

const Actions: React.FC<ActionsProps> = ({ children }) => {
	return <div className="modal-action">
		{children}
	</div>;
};

export default Object.assign(Modal, {
	Title,
	Actions
});
