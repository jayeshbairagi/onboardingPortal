import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';

export default function Header(props) {

  return (
    <Snackbar sx={{ mt: 6 }} open={props.data.enabled} autoHideDuration={6000} onClose={props.handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={props.handleClose} severity="error" sx={{ width: '100%' }}>
        {props.data.message}
      </Alert>
    </Snackbar>
  );
}
