import React from 'react';
import Center from '../../framework/components/primitives/Center';
import { Text, Flex } from '../../framework/components/primitives';
import Modal from './Modal';
import styled from 'styled-components';

type ErrorModalProps = {
	message?: string;
	isOpen: boolean;
	closeModal: () => void;
};

const ErrorModal = ({ isOpen, message, closeModal }: ErrorModalProps) => {
	return (
		<Modal isOpen={isOpen} closeModal={closeModal} closeButton={true}>
			<ClickthroughCentered>
				<Flex flexDirection='column'>
					<Text>There seems to be an error...</Text>
					<Text>{message}</Text>
				</Flex>
			</ClickthroughCentered>
		</Modal>
	);
};

export default ErrorModal;

const ClickthroughCentered = styled(Centered).attrs({
	px: { _: 3, sm: 4 },
	py: 4,
})`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	pointer-events: none;
`;
