import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import TabTitle from 'src/components/tabTitle/tabTitle';
import PageHeader from 'src/components/pageHeader/PageHeader';
import GridForm from 'src/components/form/GridForm';
import CardWrapper from 'src/components/common/cardWrapper';
import { GET_GRIDS, GRID_ACTIONS } from 'src/apiService/apiDeclaration';
import usePagination from 'src/hooks/usePagination';
import CustomLoader from 'src/components/common/loader';
import { useNavigate } from 'react-router-dom';
import LoaderButton from 'src/components/common/loaderButton';

const DataGrid = () => {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);
  const { loading, data, refresh, loadMore } = usePagination(GET_GRIDS);
  const [showForm, setShowForm] = useState(false);
  const handleGridClick = (id, columns, actions, name) => {
    navigate('/grid-data', { state: { id, columns, actions, name } });
  };
  const onSuccess = () => {
    refresh();
    setShowForm(!showForm);
  };
  const getActions = async () => {
    try {
      const response = await GRID_ACTIONS();
      setActions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActions();
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <TabTitle title={'Grids'} />
      <Grid item xs={12}>
        <PageHeader pageTitle={'Data Grids'} buttonTitle="Add new grid" onButtonClick={() => setShowForm(!showForm)} />
      </Grid>
      {showForm && (
        <Grid item xs={12}>
          <CardWrapper title={'Add new Grid'}>
            <GridForm onSuccess={onSuccess} actions={actions} onCancel={() => setShowForm(!showForm)} />
          </CardWrapper>
        </Grid>
      )}

      {data.rows.map((grid) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={grid._id}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardActionArea onClick={() => handleGridClick(grid._id, grid.columnConfig, grid.actions, grid.name)}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {grid.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 40 }}
                >
                  {grid.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {loading && (
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <CustomLoader />
        </Grid>
      )}
      {data.hasNextPage && (
        <Grid item xs={12}>
          <Grid container>
            <Grid>
              <LoaderButton buttonText={'View more'} onClick={loadMore} loading={loading} disabled={loading} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DataGrid;
