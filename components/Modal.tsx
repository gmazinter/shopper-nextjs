import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useResponsive } from '../framework/hooks/useResponsive';

export default ({ isOpen, ...rest }) => {
	const { useMediaQuery } = useResponsive();
	const overlay = useMediaQuery({
		_: undefined,
		sm: undefined,
	}) as {};
	const content = useMediaQuery({
		_: { padding: 0, top: 0, bottom: 0, left: 0, right: 0 },
		sm: undefined,
	}) as {};
	return <Modal isOpen={isOpen} style={{ overlay, content }} {...rest} />;
};
