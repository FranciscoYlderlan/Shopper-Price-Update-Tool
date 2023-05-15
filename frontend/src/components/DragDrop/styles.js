import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    display: grid;
    align-items: center;
    justify-items: center;
    gap: 1rem;

    text-align: center;

    padding: 3rem 1rem;

    border: 2px dashed ${({ theme }) => theme.COLORS.ZINC_100};

    border-radius: 0.5rem;

    background-color: ${({ theme }) => theme.COLORS.ZINC};
    color: ${({ theme }) => theme.COLORS.ZINC_200};

    > svg {
        fill: ${({ theme }) => theme.COLORS.ZINC_100};
    }

    > input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        cursor: pointer;
    }
    &:hover,
    &.dragover {
        opacity: 0.6;
    }
`;
