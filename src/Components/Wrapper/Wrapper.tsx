import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface iProps {
    children: ReactNode;
}

const Wrapper = (props: iProps) => {
    const { children } = props;
    return <_Wrapper>{children}</_Wrapper>;
};

const _Wrapper = styled.div.attrs({
    className: 'paper',
})`
    max-width: max(768px, 62.5%);
    height: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    margin-inline: auto;
    position: relative;
    overflow-y: auto;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        margin: 0;
    }
`;
export default Wrapper;
