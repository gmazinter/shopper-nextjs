import styled from 'styled-components';
import {
	grid,
	flex,
	position,
	color,
	space,
	layout,
	shadow,
	GridProps,
	FlexProps,
	PositionProps,
	ColorProps,
	SpaceProps,
	LayoutProps,
	ShadowProps,
	FlexboxProps,
} from 'styled-system';

export type BoxProps = FlexboxProps &
	GridProps &
	FlexProps &
	PositionProps &
	SpaceProps &
	LayoutProps &
	ColorProps &
	ShadowProps;

export default styled.div<BoxProps>`
    ${grid}
    ${flex}
    ${position}
    ${space}
    ${layout}
    ${color}
    ${shadow}
`;
