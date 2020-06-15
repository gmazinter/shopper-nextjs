import styled from 'styled-components';
import {
	flex,
	color,
	space,
	typography,
	SpaceProps,
	TypographyProps,
	ColorProps,
	FlexProps,
} from 'styled-system';

const Title = styled.div.attrs<{ size: number }>(props => ({
	fontSize: props.size,
	fontWeight: 'bolder',
}))<TypographyProps & SpaceProps & ColorProps & FlexProps>`
    ${typography}
    ${space}
    ${color}
    ${flex}
`;

export default Title;
