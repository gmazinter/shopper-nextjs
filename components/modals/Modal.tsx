import React, { MutableRefObject } from 'react';
import { Flex, Text, Box } from '../../framework/components/primitives';
import ReactModal from 'react-modal';
import { useResponsive } from '../../framework/hooks/useResponsive';
import { useTheme } from '../../framework/hooks/useTheme';
import { IconButton } from '../customMaterialUi';
import CloseIcon from '@material-ui/icons/Close';

export type ModalProps = {
	children?: React.ReactNode;
	isOpen: boolean;
	title?: string;
	closeModal: () => void;
	closeButton?: boolean;
	style?: { overlay: {}; content: {} };
};

const Modal = React.forwardRef(
	(
		{
			isOpen,
			children,
			title,
			closeModal,
			closeButton,
			style,
			...rest
		}: ModalProps,
		ref
	) => {
		const { theme } = useTheme();
		const { useMediaQuery } = useResponsive();
		const overlay = useMediaQuery({
			_: { zIndex: theme.zIndices['modal'] },
			sm: {
				zIndex: theme.zIndices['modal'],
				backgroundColor: '#80808080',
			},
		}) as {};
		const content = useMediaQuery({
			_: {
				padding: 0,
				borderRadius: theme.radii[2],
				top: theme.space[5],
				bottom: theme.space[5],
				left: theme.space[3],
				right: theme.space[3],
			},
			sm: {
				padding: 0,
				borderRadius: theme.radii[3],
				top: theme.space[6],
				bottom: theme.space[6],
				left: theme.space[6],
				right: theme.space[6],
				maxWidth: '600px',
				margin: '0 auto',
			},
		}) as {};
		ReactModal.setAppElement('#__next');
		return (
			<ReactModal
				contentRef={element => {
					const adaptedRef = ref as MutableRefObject<unknown>;
					if (adaptedRef) {
						adaptedRef.current = element;
					}
				}}
				isOpen={isOpen}
				style={style || { overlay, content }}
				onRequestClose={closeModal}
				{...rest}
			>
				<Flex justifyContent='space-between'>
					<Text flex={1}>{title}</Text>
					{closeButton && (
						<IconButton onClick={closeModal}>
							<CloseIcon />
						</IconButton>
					)}
				</Flex>
				{children}
			</ReactModal>
		);
	}
);

export default Modal;
