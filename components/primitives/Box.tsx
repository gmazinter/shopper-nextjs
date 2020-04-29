import styled from 'styled-components';
import {
    flex,
    position,
    color,
    space,
    layout,
    shadow,
    FlexProps,
    PositionProps,
    ColorProps,
    SpaceProps,
    LayoutProps,
    ShadowProps,
    FlexboxProps,
} from 'styled-system';

export type BoxProps =
    FlexboxProps &
    FlexProps &
    PositionProps &
    SpaceProps &
    LayoutProps &
    ColorProps &
    ShadowProps;

export default styled.div<BoxProps>`
    ${flex}
    ${position}
    ${space}
    ${layout}
    ${color}
    ${shadow}
`;