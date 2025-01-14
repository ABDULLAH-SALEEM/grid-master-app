import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { TablePagination } from '@mui/material';
ModuleRegistry.registerModules([AllCommunityModule]);

const AgDataTable = ({ data, colDefs, paginationModel, setPaginationModel, setQuerryParams, gridId }) => {
  const buildQueryParams = (filterModel) => {
    const filters = Object.entries(filterModel).map(([column, filterDetails]) => {
      const { operator, conditions, type, filter } = filterDetails;
      if (conditions) {
        return {
          column,
          operator,
          conditions: conditions.map((c) => ({
            type: c.type,
            value: c.filter,
          })),
        };
      }
      return {
        column,
        type,
        value: filter,
      };
    });

    return encodeURIComponent(JSON.stringify(filters));
  };
  const onFilterChange = (event) => {
    const filterModel = event.api.getFilterModel();
    setQuerryParams({ gridId, filters: buildQueryParams(filterModel) });
  };

  const handleChangePage = (event, newPage) => {
    setPaginationModel({
      page: newPage,
      pageSize: paginationModel.pageSize,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationModel({
      page: paginationModel.page,
      pageSize: parseInt(event.target.value, 10),
    });
  };
  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={data.rows.map((row) => ({ ...row.rowData, id: row._id }))}
        columnDefs={colDefs}
        defaultColDef={{ filter: true, floatingFilter: true, sortable: false }}
        onFilterChanged={onFilterChange}
      />
      {/* Used MUI pagination because AG Grid Pagination module is paid :) */}
      <TablePagination
        component="div"
        count={data.totalDocs}
        page={paginationModel.page}
        showFirstButton
        showLastButton
        onPageChange={handleChangePage}
        rowsPerPage={paginationModel.pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AgDataTable;
