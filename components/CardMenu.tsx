import React from 'react';
import styled from 'styled-components';
import Flex from './primitives/Flex';
import Button from './Button';
import IconButton from './IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MoreIcon from '@material-ui/icons/More';
import MoreVert from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { shadow, ColorProps, ShadowProps } from 'styled-system';

type CardMenuProps = {
	isLoading: boolean;
	isOpen: boolean;
	toggleMenu: (e: React.MouseEvent | React.TouchEvent) => void;
	annotateImage: () => void;
	searchByImage: () => void;
};

export default ({
	isLoading,
	isOpen,
	toggleMenu,
	annotateImage,
	searchByImage,
}: CardMenuProps) => {
	return (
		<MenuContainer isOpen={isOpen}>
			<Button mr={2} color='primary' variant='contained'>
				select
			</Button>
			<ActionButtons>
				{isOpen && (
					<>
						<CardIconButton onClick={annotateImage} color='primary'>
							<MoreIcon />
						</CardIconButton>
						<CardIconButton onClick={searchByImage} color='primary'>
							<PhotoCameraIcon />
						</CardIconButton>
					</>
				)}
				<CardIconButton onClick={toggleMenu} color='primary'>
					{isLoading ? <CircularProgress /> : <MoreVert />}
				</CardIconButton>
			</ActionButtons>
		</MenuContainer>
	);
};

const ActionButtons = styled(Flex)`
	flex-direction: column;
`;

const MenuContainer = styled(Flex).attrs<{ isOpen: boolean }>(props => ({
	p: 2,
	bg: props.isOpen ? 'rgb(0, 0, 0, 50%)' : 'initial',
	zIndex: 'content',
}))<{ isOpen: boolean }>`
	justify-content: flex-end;
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
	boxShadow: 'smallSharp',
	mt: 2,
	p: 2,
})<ColorProps & ShadowProps>`
	${shadow}
	background-color: white;
`;
