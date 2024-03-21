import { useEffect, useMemo, useState } from "react";

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
	
	useEffect(() => {
		if ( isOpen ) {
			document.addEventListener("keydown", (e) => {
				if ( e.key === "Escape" ) {
					close();
				}
			}, false);
		}

		return () => {
			if ( isOpen === false ) {
				document.removeEventListener("keydown", (e) => {
					if ( e.key === "Escape" ) {
						close();
					}
				}, false);
			}
		};
	}, [isOpen]);

	const open = () => {
		setIsOpen( true );
	};
	
	const close = () => {
		setIsOpen( false );

		if ( props?.onClose ) {
			props.onClose();
		}
	};

	return useMemo(() => ({ open, close, isOpen }), [isOpen]);
};