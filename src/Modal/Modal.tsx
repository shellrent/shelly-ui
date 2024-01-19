import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, memo } from 'react';
import { ModalHandler } from './useModal';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
	modal: ModalHandler
} & PropsWithChildren

const Modal = memo<ModalProps>(({ modal, children }) => {
	return <Transition appear show={modal.isOpen} as={Fragment}>
		<Dialog as="dialog" className="modal modal-open text-base-content overflow-y-scroll" onClose={() => modal.close()}>
			<div className="modal-box w-5/6 max-w-2xl !max-h-none overflow-y-visible">
				<Transition.Child
					enter="ease-out duration-100"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{children}
				</Transition.Child>
			</div>
		</Dialog>
	</Transition>;
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
