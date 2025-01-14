import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { GET_GRID_DATA } from 'src/apiService/apiDeclaration';
import { ICONS } from 'src/assets/library';
import ActionCellRenderer from 'src/components/common/actionCellRendered';
import AgDataTable from 'src/components/common/dataTable';
import CustomTextField from 'src/components/formFields/textField';
import PageHeader from 'src/components/pageHeader/PageHeader';
import usePagination from 'src/hooks/usePagination';

const GridData = () => {
  const location = useLocation();
  const { id, columns, actions, name } = location.state || {};

  const { paginationModel, setPaginationModel, loading, data, setQuerryParams, refresh, querryParams } = usePagination(
    GET_GRID_DATA,
    {
      gridId: id,
    }
  );

  const updatedColumns = [
    ...columns,
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: ({ data }) => <ActionCellRenderer actions={actions} data={data} onRefresh={refresh} />,
      filter: false,
      width: 80,
    },
  ];

  const onSearchQuery = (e) => {
    const query = e.target.value;
    if (query.length >= 3 || query === '') {
      const newQueryParams = { ...querryParams, globalSearch: query };
      setQuerryParams(newQueryParams);
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageHeader pageTitle={name}>
            <CustomTextField icon={ICONS.SEARCH} placeholder={'Search'} onChange={onSearchQuery} />
          </PageHeader>
        </Grid>
        <Grid item xs={12}>
          <AgDataTable
            gridId={id}
            setQuerryParams={setQuerryParams}
            loading={loading}
            colDefs={updatedColumns}
            data={data}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default GridData;
