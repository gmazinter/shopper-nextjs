import { TextField as MuiTextField } from '@material-ui/core';
import styled from 'styled-components';
import { CardProps } from '../../framework/components/primitives/Card';
import { border, flex, space } from 'styled-system';

export default styled(MuiTextField).attrs<{ className?: string }>(props => ({
	className: props.className,
}))<CardProps>`
    ${flex}
    ${space}
    ${border}
`;
