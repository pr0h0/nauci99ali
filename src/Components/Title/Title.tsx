import styled from 'styled-components';

// papercss pins h1 at a fixed 80px, which eats two thirds of a phone screen —
// scale it with the viewport instead
const Title = styled.h1`
    width: 100%;
    text-align: center;
    /* 4rem is papercss's original 80px (root font-size is 20px) — this only
       ever scales the heading down, never past what desktop already had */
    font-size: clamp(2rem, 8vw, 4rem);
    line-height: 1.15;
    text-wrap: balance;
`;
export default Title;
