import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, memo } from 'react';
import { ModalHandler } from './useModal';

type ModalProps = {
    modal: ModalHandler

} & PropsWithChildren

const Modal = memo<ModalProps>( ( {modal, children} ) => {
	return <Transition appear show={modal.isOpen} as={Fragment}>
		<Dialog as="dialog" className="modal modal-open text-neutral" onClose={() => modal.close()}>
			<div className="modal-box w-5/6 max-w-2xl overflow-y-scroll relative">
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
} );

Modal.displayName = 'Modal';

type TitleProps = PropsWithChildren;

const Title: React.FC<TitleProps>= ( {children} ) => {
	return <Dialog.Title className="text-xl font-semibold mb-2">
		{children}
	</Dialog.Title>;
};

type ActionsProps = PropsWithChildren;

const Actions: React.FC<ActionsProps>= ( {children} ) => {
	return <div className="modal-action">
		{children}
	</div>;
};

export default Object.assign( Modal, {
	Title,
	Actions
});