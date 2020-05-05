import React from 'react';
import styled from 'styled-components';
import { BoxProps } from './Box';
import { space, layout } from 'styled-system';

type ImageProps = {
    src: string;
    alt: string;
    className?: string;
};

const Image = ({ src, alt, className }: ImageProps) => {
    return (
        <img
            className={className}
            src={src}
            alt={alt || ''}
        />
    )
};

export default styled(Image) <BoxProps>`
    ${space};
    ${layout};
`;