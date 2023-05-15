import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid/';
const columns = [
  { field: 'id', headerName: 'Index', width:70},
  { field: 'product_code', headerName: 'Código do Produto', width:200 },
  { field: 'new_price', headerName: 'Novo preço', width:200 },
];

export function DataTable({data}) {
  
  const [rows, setRows] = React.useState([]);

  function handleFormatData() {
    const formattedData = data.map((row, index) => {
      return {
        id:index,
        ...row
      }
    });
    setRows(formattedData)
  }

  React.useEffect(() => {
    handleFormatData();
  },[])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
