import React from 'react';
import { Centered } from '../framework/components/primitives/Flex';
import { Box, Text } from '../framework/components/primitives';
import Modal from './Modal';

type ErrorModalProps = {
	message?: string;
	isOpen: boolean;
};

export default ({ isOpen, message }: ErrorModalProps) => {
	return (
		<Modal isOpen={isOpen}>
			<Centered
				position='absolute'
				top={0}
				bottom={0}
				left={0}
				right={0}
				p={4}
			>
				<Text>There seems to be an error...</Text>
				<Text>{message}</Text>
			</Centered>
		</Modal>
	);
};
