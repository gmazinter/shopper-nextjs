import React from 'react';
import Box from './primitives/Box';
import Text from './primitives/Text';
import Flex from './primitives/Flex';
import InfoTag from './InfoTag';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from './IconButton';
import Chip from './Chip';
import Image from './primitives/Image';
import styled from 'styled-components';

export default ({ product, toggleFavorite, handleLabelClick }) => {
	const { websiteTitle, url, imageUri, infoTags, labels } = product;
	return (
		<Box mb={2}>
			<Flex mb={2} position='relative'>
				{infoTags?.slice(0, 1).map(infoTag => {
					const { title, value } = infoTag;
					return <InfoTag title={title} value={value} mr={4} />;
				})}
				<FavoriteButton
					onClick={() => toggleFavorite(product.url)}
					color='primary'
				>
					{product.isFavorite ? (
						<FavoriteIcon />
					) : (
						<FavoriteBorderIcon />
					)}
				</FavoriteButton>
				{infoTags?.slice(1).map(infoTag => {
					const { title, value } = infoTag;
					return <InfoTag title={title} value={value} />;
				})}
			</Flex>
			<Text mb={2} fontSize={{ _: 3, sm: 4 }}>
				<a href={url} target='_blank' rel='noreferrer noopener'>
					{websiteTitle}
				</a>
			</Text>
			<Image mb={1} width={1} src={imageUri || ''} alt='' />
			<SuggestedLabels
				labels={labels}
				handleLabelClick={handleLabelClick}
			/>
		</Box>
	);
};

const SuggestedLabels = ({ labels, handleLabelClick }) => {
	return (
		<Flex flexWrap='wrap'>
			{labels &&
				labels.map(label => (
					<LabelChip
						id={label}
						onClick={() => handleLabelClick(label)}
						label={label}
					/>
				))}
		</Flex>
	);
};

const LabelChip = styled(Chip).attrs({
	size: 'small',
	fontSize: { _: 2, sm: 3 },
	mr: { _: 1, sm: 2 },
	mb: 1,
})``;

const FavoriteButton = styled(IconButton)`
	padding: 0;
	position: absolute;
	top: 0;
	right: 0;
`;
