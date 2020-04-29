import { ReactNode } from 'react';
import { useMediaQuery } from 'beautiful-react-hooks';
import { useTheme } from './useTheme';

type Elements = {
    _?: ReactNode,
    sm?: ReactNode,
    md?: ReactNode,
    lg?: ReactNode,
    xl?: ReactNode,
};

export const useResponsive = () => {
    const { theme } = useTheme();
    const { sm, md, lg, xl } = theme.breakpoints;
    const isSmall = useMediaQuery(`(min-width: ${sm})`);
    const isMedium = useMediaQuery(`(min-width: ${md})`);
    const isLarge = useMediaQuery(`(min-width: ${lg})`);
    const isExtraLarge = useMediaQuery(`(min-width: ${xl})`);

    const renderResponsive = (elements: Elements) => {
        const { _, sm, md, lg, xl } = elements;
        return (
            (isExtraLarge && xl) ||
            (isLarge && lg) ||
            (isMedium && md) ||
            (isSmall && sm) ||
            _ ||
            undefined
        )
    };

    return {
        renderResponsive
    }
};