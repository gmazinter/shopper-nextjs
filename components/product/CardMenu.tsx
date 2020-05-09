import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '../../framework/components/primitives';
import { Button, IconButton } from '../customMaterialUi';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MoreIcon from '@material-ui/icons/More';
import MoreVert from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { shadow, ColorProps, ShadowProps } from 'styled-system';
import Pricetag from './Pricetag';

type CardMenuProps = {
	cardPadding: number;
	price: {
		amount: number;
		currency: string;
	} | null;
	isLoading: boolean;
	isOpen: boolean;
	toggleMenu: (e: React.MouseEvent | React.TouchEvent) => void;
	annotateImage: () => void;
	searchByImage: () => void;
};

export default ({
	cardPadding,
	price,
	isLoading,
	isOpen,
	toggleMenu,
	annotateImage,
	searchByImage,
}: CardMenuProps) => {
	return (
		<MenuContainer isOpen={isOpen}>
			<Box flex={1} ml={-cardPadding}>
				{!!price?.amount && <Pricetag price={price} />}
			</Box>
			<ActionButtons>
				{isOpen && (
					<>
						<CardIconButton onClick={annotateImage}>
							<MoreIcon fontSize='small' />
						</CardIconButton>
						<CardIconButton onClick={searchByImage}>
							<PhotoCameraIcon fontSize='small' />
						</CardIconButton>
					</>
				)}
				<CardIconButton onClick={toggleMenu}>
					{isLoading ? (
						<CircularProgress size={30} />
					) : (
						<MoreVert fontSize='small' />
					)}
				</CardIconButton>
			</ActionButtons>
		</MenuContainer>
	);
};

const ActionButtons = styled(Flex)`
	flex-direction: column;
	align-self: flex-end;
`;

const MenuContainer = styled(Flex).attrs<{ isOpen: boolean }>(props => ({
	p: 2,
	bg: props.isOpen ? 'rgb(0, 0, 0, 50%)' : 'initial',
}))<{ isOpen: boolean }>`
	align-items: flex-end;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	button {
		pointer-events: auto;
	}
`;

const CardIconButton = styled(IconButton).attrs({
	color: 'primary',
	mt: 2,
	p: 2,
})`
	background-color: #f2f2f2;
`;
