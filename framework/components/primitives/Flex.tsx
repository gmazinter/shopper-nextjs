import styled from 'styled-components';
import { space, flexbox, FlexboxProps } from 'styled-system';
import Box from './Box';

export const Flex = styled(Box)<FlexboxProps>`
	display: flex;
	${flexbox}
`;

export const Vflex = styled(Flex)`
	flex-direction: column;
`;

export const Hflex = styled(Flex)`
	flex-direction: row;
	align-items: center;
`;

export default Flex;
