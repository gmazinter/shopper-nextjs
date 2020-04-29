import React, { useEffect, useState } from 'react';
import Box from './primitives/Box';
import ImageBar from './ImageBar';
import RefinementChips from './RefinementChips';
import { useAppState } from '../AppState';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

export default () => {
    const [scrollPos, setScrollPos] = useState(0);
    const [show, setShow] = useState(true);
    const { state: { results } } = useAppState();

    const handleScroll = () => {
        const newScrollPos = (document.body.getBoundingClientRect().top);
        setShow(newScrollPos === 0)
        // setShow(newScrollPos > scrollPos);
        setScrollPos(newScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    })

    return (
        <Box>
            {results?.items &&
                <RefinementBarContainer isVisible={show}>
                    <Container fixed>
                        <Box maxWidth={900}>
                            <CollapseBox show={show}>
                                <RefinementChips />
                            </CollapseBox>
                            <ImageBar />
                        </Box>
                    </Container>
                </RefinementBarContainer>
            }
        </Box>
    );
};

const RefinementBarContainer = styled(Box).attrs<{ isVisible: boolean }>(props => ({
    p: 2,
    boxShadow: 'small',
    zIndex: 3,
    bg: 'white',
    position: 'relative',
})) <{ isVisible: boolean }>`
`;

const CollapseBox = styled(Box) <{ show: boolean }>`
    overflow: hidden;
    transition: ${props => props.show ? 'all 500ms ease-in' : 'all 500ms ease-out'};
    max-height: ${props => props.show ? '50%' : 0};
    transform: ${props => props.show ? undefined : 'translate(0, -100%)'};
`;