import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import LoaderButton from '../common/loaderButton';
import CustomTextField from '../formFields/textField';
import { useState } from 'react';
import { showErrorTost, showSuccessTost } from 'src/constants';
import { EDIT_GRID_DATA } from 'src/apiService/apiDeclaration';
import { useNavigate } from 'react-router-dom';

const GridDataForm = ({ data, isEdit }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    mode: 'onChange',

    defaultValues: {
      rowData: { ...data },
    },
  });

  const onEditGridData = async (data) => {
    try {
      setLoading(true);
      const response = await EDIT_GRID_DATA(data.rowData.id, { data });
      showSuccessTost(response.message);
      navigate(-1);
    } catch (error) {
      showErrorTost(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onEditGridData)}>
      <Grid container spacing={2.5}>
        {Object.keys(data).map((field, index) => (
          <Grid key={index} item xs={12} md={4}>
            <CustomTextField
              label={field}
              required={false}
              disabled={!isEdit || field === 'id'}
              controller={{
                name: `rowData.${field}`,
                control: control,
              }}
            />
          </Grid>
        ))}
        {isEdit && (
          <Grid item xs={12}>
            <Grid item xs={12} md={1.5}>
              <LoaderButton disabled={loading || !isDirty} loading={loading} buttonText={'Update Data'} type="submit" />
            </Grid>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default GridDataForm;
