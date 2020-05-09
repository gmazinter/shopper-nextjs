import React from 'react';
import { Box, Flex } from '../framework/components/primitives';
import Skeleton from '@material-ui/lab/Skeleton';

export default () => {
	return (
		<Flex width='100px' justifyContent='space-evenly'>
			<Skeleton variant='rect' height='80px' width='24px' />
			<Skeleton variant='rect' height='80px' width='24px' />
			<Skeleton variant='rect' height='80px' width='24px' />
		</Flex>
	);
};
