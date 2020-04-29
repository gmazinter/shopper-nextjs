import { Input } from '@material-ui/core';
import styled from 'styled-components';
import { space, layout, LayoutProps, SpaceProps } from 'styled-system';

export default styled(Input).attrs(props => ({
	className: props.className,
}))<LayoutProps & SpaceProps>`
	${layout}
	${space}
`;
