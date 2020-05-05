import styled from 'styled-components';
import Box, { BoxProps } from './Box';
import { border, BorderProps } from 'styled-system';
import { MutableRefObject } from 'react';

export type CardProps = BoxProps & BorderProps;

export default styled(Box)<CardProps>`
	${border}
`;
