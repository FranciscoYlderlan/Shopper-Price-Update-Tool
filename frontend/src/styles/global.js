import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    
    
    
     * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    #root {
        width: 90%;
    }
    :root {
        font-size: 62.5%;
    }
    body,
    button{
        font-size: 1.6rem;
    }
    Datatable {
        font-size: 1.6rem;
    }
    body {
        font-family: 'Roboto', sans-serif;    
        background:  rgba(230,230,230,1);
        display: grid;
        justify-items: center;
        align-content: stretch;
        align-items: start;
        height: 100vh;
        width: 100vw;
    }
    .css-12u49z-MuiDataGrid-root .MuiDataGrid-cell--textLeft{
        justify-content: center !important;
        font-size: 1.2rem !important;

    }
    .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar {
        font-size: 1.2rem !important;
    }
   .MuiDataGrid-columnHeaderTitleContainer, 
   .css-1iyq7zh-MuiDataGrid-columnHeaders{
        justify-content: center !important;
        font-size: 1.2rem !important;
        background-color: ${({ theme }) => theme.COLORS.ZINC} !important;
    }
    span, li, p {
        font-family: 'Roboto', sans-serif;
    }

    li {
        list-style: none;
    }

    input {
        font-family: 'Roboto Slab', serif;
        font-style: normal;
        font-weight: 400;
        color:${({ theme }) => theme.COLORS.WHITE};
    }
    
    a {
        text-decoration: none;
        cursor: pointer;
        transition: filter .2s;
    
    }
    a:hover {
        filter: brightness(.7);
    }



    .content::-webkit-scrollbar {
        width: 25px; 
    }
    .content::-webkit-scrollbar-track {
        background: transparent;    
    
    }
    .content::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 0px 20px ${({ theme }) => theme.COLORS.PINK};
        border: solid 7px transparent;
        border-radius: 20px; 
        background-clip: padding-box;
    }

    .content {

        mask-image: linear-gradient(to top, transparent, black),
            linear-gradient(to left, transparent 17px, black 17px);
        mask-size: 100% 20000px;
        mask-position: left bottom;
        -webkit-mask-image: linear-gradient(to top, transparent, black),
            linear-gradient(to left, transparent 17px, black 17px);
        -webkit-mask-size: 100% 20000px;
        -webkit-mask-position: left bottom;
        transition: mask-position 0.3s, -webkit-mask-position 0.3s;
    }

    .content:hover {
        -webkit-mask-position: left top;
        cursor: pointer;
    } 

`;
