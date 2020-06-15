import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '../customMaterialUi';
import { useResponsive } from '../../framework/hooks/useResponsive';

export default () => {
	const [isClientSide, setIsClientSide] = useState(false);
	const { useMediaQuery } = useResponsive();

	useEffect(() => {
		setIsClientSide(true);
	}, []);

	return isClientSide
		? (useMediaQuery({
				_: (
					<Button
						ml={1}
						color='primary'
						borderRadius={2}
						variant='contained'
						borderTopLeftRadius={0}
						// borderTopRightRadius='22px'
						// borderBottomRightRadius='22px'
						// borderBottomLeftRadius={0}
						// border='1px solid grey'
						type='submit'
					>
						<SearchIcon />
					</Button>
				),
				sm: (
					<Button
						borderRadius={2}
						type='submit'
						color='primary'
						variant='contained'
					>
						Search
					</Button>
				),
		  }) as React.ReactElement)
		: null;
};
