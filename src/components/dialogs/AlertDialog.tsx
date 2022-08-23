import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props: any) => {
  const {msgtitle, msgcontent, msgstatus, handleClose} = props;

  return (
    <Dialog
      open={msgstatus}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{msgtitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msgcontent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
