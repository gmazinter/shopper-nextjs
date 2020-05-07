import styled from 'styled-components';
import { Container } from '@material-ui/core';
import {
	space,
	layout,
	flexbox,
	position,
	SpaceProps,
	LayoutProps,
	FlexboxProps,
	PositionProps,
} from 'styled-system';

export default styled(Container)<
	SpaceProps & LayoutProps & FlexboxProps & PositionProps
>`
    ${flexbox}
	${space}
	${layout}
	${position}
`;
