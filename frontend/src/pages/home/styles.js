import styled from 'styled-components';

export const Container = styled.main`
    display: grid;
    place-items: center;
    gap: 3rem;
    margin: 0 auto;
    width: 100%;

    &:first-child {
        .col-2 {
            display: flex;
            gap: 2rem;
            button + button {
                background-color: ${({ theme }) => theme.COLORS.GREEN_100};
            }
            button + button:hover {
                background-color: ${({ theme }) => theme.COLORS.GREEN_200};
            }
        }
    }
`;
