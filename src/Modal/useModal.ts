import { useState } from "react";

export type ModalHandler = {
    open: () => void,
    close: () => void,
    isOpen: boolean
}

type UseModalProps = { 
	defaultOpen?: boolean
	onClose?: () => void
}

export const useModal = ( props?: UseModalProps ): ModalHandler => {
	const [isOpen, setIsOpen] = useState<boolean>(Boolean( props?.defaultOpen ));
	
	const open = () => {
		setIsOpen( true );
	};
	
	const close = () => {
		setIsOpen( false );

		if ( props?.onClose ) {
			props.onClose();
		}
	};

	return { open, close, isOpen };
};