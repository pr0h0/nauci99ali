import styled from 'styled-components';

export const NauciImena = styled.div`
    display: flex;
    flex-direction: column;
    .selectovi {
        display: flex;
        flex-wrap: nowrap;
        > .form-group {
            width: 90%;
            margin-inline: 5%;
            > * {
                width: 100%;
            }
        }
    }
`;
