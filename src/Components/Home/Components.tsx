import React from 'react';
import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
`;
export const ListItem = styled.li`
    width: 100%;
    margin-block: 0.5rem;
    > button {
        width: 100%;
    }
    :before {
        display: none;
    }
`;
