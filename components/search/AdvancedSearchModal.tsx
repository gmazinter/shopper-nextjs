import React from 'react';
import Modal from 'react-modal';
import AdvancedControls from './AdvancedControls';
import Searchbar from './Searchbar';

export default ({
	isOpen,
	closeModal,
}: {
	isOpen: boolean;
	closeModal: () => void;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={{
				overlay: { backgroundColor: 'pink' },
				content: {
					// zIndex: 50,
					padding: 0,
					// top: 0,
					// left: 0,
					// right: 0,
					// bottom: 0,
					// paddingTop: '60px',
				},
			}}
		>
			<AdvancedControls />
		</Modal>
	);
};
