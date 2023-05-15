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

    background-color: ${({ theme }) => theme.COLORS.BLUE};
    color: ${({ theme }) => theme.COLORS.WHITE};

    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.1rem;

    transition: all 0.3s;

    &:disabled {
        cursor: not-allowed;
    }
    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.COLORS.BLUE_100};
    }
`;
