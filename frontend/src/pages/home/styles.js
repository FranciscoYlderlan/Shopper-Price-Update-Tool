import styled from 'styled-components';

export const Container = styled.main`
    display: grid;
    place-items: center;
    gap: 3rem;
    margin: 0 auto;
    width: 100%;

    .col-2 {
        display: flex;
        gap: 2rem;
        width: 90%;
    }

    .TableView {
        display: grid;
        place-items: center;
    }
`;
