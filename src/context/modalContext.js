import { createContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box } from '@mui/material';

const ModalContext = createContext({});

const initialState = {
  title: '',
  description: '',
  showModal: false,
  onConfirm: () => {},
  child: undefined,
};

const ModalProvider = ({ children }) => {
  const [dialogData, setDialogData] = useState(initialState);
  const handleModalClose = () => {
    setDialogData(initialState);
  };

  return (
    <ModalContext.Provider value={{ setDialogData, handleModalClose }}>
      <Dialog
        open={dialogData?.showModal}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid
          px={{ xs: 1 }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={handleModalClose}
          sx={{
            cursor: 'pointer',
            width: '100%',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              paddingLeft: '16px',
            }}
          >
            {dialogData?.title}
          </DialogTitle>
          <Box
            sx={{
              alignSelf: { xs: 'flex-end', sm: 'center' },
            }}
            component="img"
            width={{ xs: 16, sm: 20 }}
            height={{ xs: 16, sm: 20 }}
            src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
            alt="closeicon"
          />
        </Grid>

        <DialogContent sx={{ m: 0, paddingTop: 0 }}>
          {dialogData?.description}
          {dialogData?.child}
        </DialogContent>
        {!dialogData?.child && (
          <DialogActions>
            <Button size="small" variant="contained" color="error" onClick={dialogData?.onConfirm}>
              Confirm
            </Button>
          </DialogActions>
        )}
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
