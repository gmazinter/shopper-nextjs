import React from 'react';
import { Centered } from '../../framework/components/primitives/Flex';
import { Text, Flex } from '../../framework/components/primitives';
import Modal from './Modal';
import styled from 'styled-components';

type MessageModalProps = {
	message?: string;
	isOpen: boolean;
	closeModal: () => void;
};

export default ({ isOpen, message, closeModal }: MessageModalProps) => {
	return (
		<Modal isOpen={isOpen} closeModal={closeModal}>
			<ClickthroughCentered>
				<Flex flexDirection='column'>
					<Text>{message}</Text>
				</Flex>
			</ClickthroughCentered>
		</Modal>
	);
};

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
