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
import { MutableRefObject } from 'react';

export type BoxProps = FlexboxProps &
	GridProps &
	FlexProps &
	PositionProps &
	SpaceProps &
	LayoutProps &
	ColorProps &
	ShadowProps & { ref?: MutableRefObject<any> };

export default styled.div.attrs(props => ({
	ref: props.ref,
}))<BoxProps>`
    ${grid}
    ${flex}
    ${position}
    ${space}
    ${layout}
    ${color}
    ${shadow}
`;
