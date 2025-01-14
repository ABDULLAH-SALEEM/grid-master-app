import * as React from 'react';
import { styled } from '@mui/material/styles';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { IconButton, Box, Chip } from '@mui/material';
import FirebaseService from 'src/config/firebase/firebaseService';
import { showErrorTost } from 'src/constants';

const allowedFileTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];
const maxFileSizeBytes = 512 * 1024 * 1024; // 512 MB

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUploader = ({ file, setFile }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    try {
      if (!selectedFile) return;

      if (allowedFileTypes.includes(selectedFile.type)) {
        if (selectedFile.size > maxFileSizeBytes) {
          showErrorTost('File size exceeds the limit of 512 MB');
          return;
        }
        setFile({ name: selectedFile.name, uploading: true });
        const url = await FirebaseService.uploadFile(selectedFile);
        setFile({ url, name: selectedFile.name, uploading: false });

        // Clear the file input value after successful upload
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        showErrorTost('Please select a valid file type: .csv, .xlsx');
      }
    } catch (error) {
      showErrorTost('Error uploading file');
      setFile(null);

      // Clear the file input value on error
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton size="small" component="label">
        <AttachmentIcon color="primary" />
        <VisuallyHiddenInput
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          disabled={file?.uploading}
        />
      </IconButton>
      {file?.name && (
        <Chip
          label={file.name}
          onDelete={() => {
            setFile({ name: '', url: '', uploading: false });
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        />
      )}
    </Box>
  );
};

export default FileUploader;
