import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    width: 100%;
    padding: 1.6rem 1rem;

    border: none;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.COLORS.GREEN_100};
    background-color: ${({ theme }) => theme.COLORS.GREEN_200};

    background-color: ${({ theme, title }) =>
        title == 'Validar' ? theme.COLORS.BLUE : theme.COLORS.GREEN_100};
    color: ${({ theme }) => theme.COLORS.WHITE};

    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.1rem;

    transition: all 0.3s;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme, title }) =>
            title == 'Validar' ? theme.COLORS.BLUE_100 : theme.COLORS.GREEN_200};
    }
    &:disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.COLORS.ZINC_200};
    }
`;
