import React from 'react';
import Modal, { ModalProps } from './Modal';
import { useResponsive } from '../../framework/hooks/useResponsive';
import { useTheme } from '../../framework/hooks/useTheme';

const FullScreenModal = React.forwardRef((props: ModalProps, ref) => {
	const { theme } = useTheme();
	const { useMediaQuery } = useResponsive();
	const overlay = useMediaQuery({
		_: { zIndex: theme.zIndices['modal'] },
		sm: { zIndex: theme.zIndices['modal'], backgroundColor: '#80808080' },
	}) as {};
	const content = useMediaQuery({
		_: {
			padding: 0,
			borderRadius: theme.radii[2],
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
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
	return <Modal ref={ref} {...props} style={{ overlay, content }} />;
});

export default FullScreenModal;
