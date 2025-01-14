import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import LoaderButton from '../common/loaderButton';
import CustomTextField from '../formFields/textField';
import { useState } from 'react';
import { gridSchema } from 'src/config/yup';
import CustomCheckboxField from '../formFields/checkbox';
import FileUploader from '../data-grid/fileuploader';
import { showErrorTost, showSuccessTost } from 'src/constants';
import { ADD_GRID } from 'src/apiService/apiDeclaration';

const GridForm = ({ onCancel, actions, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({ name: '', url: '', uploading: false });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(gridSchema),
    defaultValues: {
      name: '',
      description: '',
      actions: [],
    },
  });

  const onAddGrid = async (data) => {
    try {
      setLoading(true);
      const payload = { ...data, file };
      const response = await ADD_GRID(payload);
      showSuccessTost(response.message);
      onSuccess();
    } catch (error) {
      showErrorTost(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onAddGrid)}>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <CustomTextField
            label={'Name'}
            controller={{
              name: 'name',
              control: control,
              errors: errors.name,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label={'Description'}
            controller={{
              name: 'description',
              control: control,
              errors: errors.description,
            }}
            multiline
            minRows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomCheckboxField
            helpText={'Actions you want to perform on the rows of data.'}
            label="Select Actions"
            controller={{
              name: 'actions',
              control: control,
              errors: errors.actions,
            }}
            options={actions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">Upload File</Typography>
          <FileUploader file={file} setFile={setFile} />
          {errors.fileUrl && (
            <Typography variant="caption" color="error">
              {errors.fileUrl.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={1.5}>
          <LoaderButton disabled={!file.url || !isValid} loading={loading} buttonText={'Add Grid'} type="submit" />
        </Grid>
        <Grid item xs={12} md={1.5}>
          <LoaderButton disabled={loading} onClick={onCancel} buttonText={'Cancel'} color="warning" />
        </Grid>
      </Grid>
    </form>
  );
};

export default GridForm;
