import React from 'react';
import Box from './primitives/Box';
import { Centered } from './primitives/Flex';
import styled from 'styled-components';

type PricetagProps = {
	className?;
	price: {
		amount: number;
		currency: string;
	};
};

export default ({ price }: PricetagProps) => {
	const { amount, currency } = price;
	return (
		<TagContainer width={100} height={40} bg='#F9E5BE' pr={2}>
			{`${amount} ${currency}`}
		</TagContainer>
	);
};

const TagContainer = styled(Centered)`
	--notchSize: 20px;

	clip-path: polygon(
		0 0,
		calc(100% - var(--notchSize)) 0,
		100% var(--notchSize),
		100% calc(100% - var(--notchSize)),
		calc(100% - var(--notchSize)) 100%,
		0 100%
	);
`;
