import React from 'react';
import styled from 'styled-components';

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <_Button {...props} />
);

export default Button;

const _Button = styled.button.attrs({
    // ponytail: `as string` stops attrs narrowing className to a literal type
    className: 'paper-btn' as string,
})`
    text-align: center;
`;
