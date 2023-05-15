import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: 100%;
    padding: 16px 0;

    border: none;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.PINK};
    color: ${({ theme }) => theme.COLORS.DARK_GRAY};

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;

    transition: all 0.3s;

    &:disabled {
        cursor: not-allowed;
        filter: brightness(0.5);
    }
    &:hover {
        cursor: pointer;
        filter: brightness(0.7);
    }
`;
