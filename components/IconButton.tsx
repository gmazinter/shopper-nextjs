import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { color, border, space, layout, flexbox } from 'styled-system';
import { CardProps } from './primitives/Card';

export default styled(IconButton)<CardProps>`
    ${border}
    ${space}
    ${layout}
    ${flexbox}
`;
