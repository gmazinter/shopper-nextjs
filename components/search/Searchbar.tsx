import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Flex } from '../../framework/components/primitives';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import LeftJustifiedContainer from '../layout/LeftJustifiedContainer';
import { useSearchState, useSearchDispatch } from './SearchState';
import { useProductDispatch } from '../product/ProductState';

import SearchControl from './SearchControl';

export default () => {
	const [isClientSide, setIsClientSide] = useState(false);
	const { useMediaQuery } = useResponsive();

	useEffect(() => {
		setIsClientSide(true);
	}, []);

	let appTitle: React.ReactNode;
	let inputPlaceholder: React.ReactNode;
	if (isClientSide) {
		appTitle = useMediaQuery({
			_: null,
			sm: (
				<Text mr={2} fontSize={7} fontWeight='bold'>
					SHOPPER
				</Text>
			),
		});

		inputPlaceholder = useMediaQuery({
			_: 'Shopper',
			sm: 'Search',
		});
	}

	return (
		<SearchbarContainer>
			<LeftJustifiedContainer>
				<Flex>{appTitle}</Flex>
				<SearchControl />
			</LeftJustifiedContainer>
		</SearchbarContainer>
	);
};

const SearchbarContainer = styled(Box).attrs({
	p: 2,
	boxShadow: 'small',
	bg: 'white',
	position: 'relative',
})``;
