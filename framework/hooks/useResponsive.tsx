import { ReactNode } from 'react';
import { useMediaQuery as useMediaQueryHook } from 'beautiful-react-hooks';
import { useTheme } from './useTheme';

type Elements = {
	_?: ReactNode;
	sm?: ReactNode;
	md?: ReactNode;
	lg?: ReactNode;
	xl?: ReactNode;
};

export const useResponsive = () => {
	const { theme } = useTheme();
	const { sm, md, lg, xl } = theme.breakpoints;
	const isSmall = useMediaQueryHook(`(min-width: ${sm})`);
	const isMedium = useMediaQueryHook(`(min-width: ${md})`);
	const isLarge = useMediaQueryHook(`(min-width: ${lg})`);
	const isExtraLarge = useMediaQueryHook(`(min-width: ${xl})`);

	const useMediaQuery = (elements: Elements): React.ReactNode => {
		const { _, sm, md, lg, xl } = elements;
		return (
			(isExtraLarge && xl) ||
			(isLarge && lg) ||
			(isMedium && md) ||
			(isSmall && sm) ||
			_ ||
			undefined
		);
	};

	return {
		isSmall,
		isMedium,
		isLarge,
		isExtraLarge,
		useMediaQuery,
	};
};
