import { Chip } from '@material-ui/core';
import styled from 'styled-components';
import {
	space,
	layout,
	typography,
	LayoutProps,
	SpaceProps,
	TypographyProps,
} from 'styled-system';

export default styled(Chip).attrs(props => ({
	className: props.className,
}))<LayoutProps & SpaceProps & TypographyProps>`
    ${layout}
    ${space}
    ${typography}
`;
