import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    place-items: center;

    max-width: 70rem;

    gap: 1rem;

    width: 100%;

    padding: 2rem 0;

    background-color: ${({ theme }) => theme.COLORS.WHITE};
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

    border-radius: 0.5rem;
`;
