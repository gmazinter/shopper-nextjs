import { Button, ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import { border, space, layout, flexbox } from 'styled-system';
import { CardProps } from '../../framework/components/primitives/Card';

export default styled(Button)<CardProps>`
    ${border}
    ${space}
    ${layout}
    ${flexbox}
`;
