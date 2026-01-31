import React from 'react';
import styled from 'styled-components';

interface iProps {
    onClick?: (arg?: any) => void;
    children?: JSX.Element | JSX.Element[] | string;
    [key: string]: any;
}
const Button = (props: iProps) => {
    const { onClick, children, ...rest } = props;
    return (
        <_Button {...rest} onClick={onClick}>
            {children}
        </_Button>
    );
};

export default Button;

const _Button = styled.button.attrs({
    className: 'paper-btn',
})`
    text-align: center;
`;
