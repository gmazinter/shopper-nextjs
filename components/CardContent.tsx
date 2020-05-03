import React from 'react';
import Box from './primitives/Box';
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
				{infoTags?.map(infoTag => {
					const { title, value } = infoTag;
					return <InfoTag title={title} value={value} />;
				})}
			</Flex>
			<Box mb={2}>
				<a href={url} target='_blank' rel='noreferrer noopener'>
					{websiteTitle}
				</a>
			</Box>
			<Image width={1} src={imageUri || ''} alt='' />
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
						size='small'
						id={label}
						onClick={() => handleLabelClick(label)}
						mr={2}
						mb={1}
						label={label}
						// icon={_.includes(moreLabels, tag) ? < DoneIcon /> : <RadioButtonUncheckedIcon />}
					/>
				))}
		</Flex>
	);
};

const LabelChip = styled(Chip)``;

const FavoriteButton = styled(IconButton)`
	padding: 0;
	position: absolute;
	top: 0;
	right: 0;
`;
