import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomTable = ({
  loading,
  rows,
  columns,
  isServerSidePagination = false,
  paginationModel,
  setPaginationModel,
  rowCount,
  onRowClick,
  isRowColored = false,
}) => {
  const slots = {
    noRowsOverlay: () => (
      <Grid width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
        <Typography variant="body2">No records found</Typography>
      </Grid>
    ),
  };
  const { t } = useTranslation();

  const handleCellClick = (params) => {
    const clickedField = params.field;

    if (clickedField !== 'action') {
      onRowClick(params.row);
    }
  };
  columns = columns.map((col) => {
    return {
      ...col,
      headerName: t(col.headerName),
    };
  });
  const addClassName = (row) => {
    let stockRowColor = '';
    switch (row.stockAdd) {
      case true:
        stockRowColor = 'coloredGreen';
        break;
      case false:
        stockRowColor = 'coloredRed';
        break;
      default:
        stockRowColor = '';
    }
    return stockRowColor;
  };

  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('82vh');

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;

      if (height > 1400) {
        setMinHeight('44vh');
        setMaxHeight('auto');
      } else if (height > 1200) {
        setMinHeight('50vh');
        setMaxHeight('auto');
      } else if (height > 865) {
        setMinHeight('66vh');
        setMaxHeight('82vh');
      } else if (height > 715) {
        setMinHeight('75vh');
        setMaxHeight('75vh');
      } else {
        setMinHeight('72vh');
        setMaxHeight('72vh');
      }
    };

    window.addEventListener('resize', handleResize);

    if (!minHeight || !maxHeight) {
      handleResize();
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [minHeight, maxHeight]);
  const pageSizeOptions = [5, 10, 20];
  return (
    <>
      {isServerSidePagination ? (
        <DataGrid
          sx={{
            minHeight: rows.length === 0 ? '50vh' : loading ? minHeight : 'auto',
            maxHeight: maxHeight,
          }}
          rows={rows}
          onCellClick={onRowClick && handleCellClick}
          getRowClassName={isRowColored && ((params) => addClassName(params.row))}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          getRowId={(row) => row._id || row.date}
          columns={columns}
          pagination
          loading={loading}
          paginationModel={paginationModel}
          pageSizeOptions={pageSizeOptions}
          rowCount={rowCount}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          slots={slots}
        />
      ) : (
        <DataGrid
          rows={rows}
          onCellClick={onRowClick && handleCellClick}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          getRowId={(row, index) => row._id || index}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
            },
          }}
          pageSizeOptions={pageSizeOptions}
          slots={slots}
        />
      )}
    </>
  );
};

export default CustomTable;
