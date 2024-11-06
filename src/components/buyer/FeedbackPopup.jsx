import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const FeedbackPopup = ({ message, type, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity={type} 
        variant="filled"
        sx={{ 
          width: '100%',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.9rem'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackPopup; 