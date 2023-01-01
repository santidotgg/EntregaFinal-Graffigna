import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';


const Notification = (message, status) => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if (message === '') return 
  

  return (
    <Alert severity={status}>
    <AlertTitle>{status === 'success' ? 'Success': 'Info'}</AlertTitle>
    {message}
    </Alert>
  );
}

export default Notification;
