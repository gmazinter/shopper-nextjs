import React from 'react';
import Text from '../../framework/components/primitives/Text';
import { Centered } from '../../framework/components/primitives/Flex';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';

type PricetagProps = {
	className?;
	price: {
		amount: number;
		currency: string;
	};
};

export default ({ price }: PricetagProps) => {
	const { amount, currency } = price;
	const { isSmall } = useResponsive();
	const notchSize = !isSmall ? '18px' : '20px';
	return (
		<TagContainer notchSize={notchSize}>
			<Text fontSize={{ _: 3, sm: 4 }}>{`${amount} ${currency}`}</Text>
		</TagContainer>
	);
};

const TagContainer = styled(Centered).attrs({
	width: { _: 80, sm: 100 },
	height: { _: 36, sm: 40 },
	bg: '#F9E5BE',
	pr: 2,
})<{ notchSize: string }>`
	clip-path: polygon(
		0 0,
		calc(100% - ${props => props.notchSize}) 0,
		100% ${props => props.notchSize},
		100% calc(100% - ${props => props.notchSize}),
		calc(100% - ${props => props.notchSize}) 100%,
		0 100%
	);
`;
