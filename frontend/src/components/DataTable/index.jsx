import { useState, useEffect }from 'react';
import { DataGrid } from '@mui/x-data-grid/';
import { AlertIcon } from '../AlertIcon';
import { AlertPopover } from '../AlertPopover';
import {GrStatusWarning, GrStatusGood} from 'react-icons/gr';


const columns = [
  { field: 'id', headerName: 'Index', width:70},
  { field: 'product_code', headerName: 'Código do Produto', width:200 },
  { field: 'new_price', headerName: 'Novo preço', width:200 },
];

const columnsValidated = [
  { field: 'id', headerName: 'Index', minWidth:70},
  { field: 'product_code', headerName: 'Código do Produto', minWidth:150 },
  { field: 'new_price', headerName: 'Novo preço', minWidth:150 },
  { field: 'error_log', headerName: 'Status',  minWidth: 100,
  description: "Para mais detalhes clique no ícone",
  // headerAlign: "left",
    renderCell: (params) => {
      if(params.value) {
        return (<GrStatusWarning size={20}  style={{ background:'#DC2626'}}/>)
      }
      return (<GrStatusGood size={20}  style={{ background:'#15803D'}} />) 

      
    }
  },
];


export function DataTable({data, onValidate}) {
  
  const [rows, setRows] = useState([]);

  const [reload, setReload] = useState(false);

  function handleFormatData() {
    setReload(true);
    const formattedData = data.map(({new_price, product_code, error_log}, index) => {
      if(onValidate){
        return {
          id:index,
          new_price,
          product_code,
          error_log : error_log.join(';')
        }
      }
      return {
        id:index,
        new_price,
        product_code,
      }
    });
    setRows(formattedData);
  }

  useEffect(() => {
    handleFormatData();
  },[])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={onValidate? columnsValidated : columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}       
      />
    </div>
  );
}
