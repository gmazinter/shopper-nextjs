import React from 'react';
import Box, { BoxProps } from './primitives/Box';
import Card from './primitives/Card';
import styled from 'styled-components';
import { layout, space, flex } from 'styled-system';
import Image from './primitives/Image';

type FixedRatioImageProps = {
	src: string;
	alt: string;
	className?: string;
} & BoxProps;

const FixedRatioImage = ({ src, alt, className }: FixedRatioImageProps) => (
	<Card className={className}>
		<FixedRatioWrapper>
			<ContainedImage src={src} alt={alt}></ContainedImage>
		</FixedRatioWrapper>
	</Card>
);

export default styled(FixedRatioImage)`
    ${layout}
    ${space}
    ${flex}
`;

export const FixedRatioWrapper = styled(Box)`
	width: 100%;
	padding-top: 100%;
	background-color: white;
	position: relative;
`;

export const ContainedImage = styled(Image)`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
