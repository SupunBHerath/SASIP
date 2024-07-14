import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function ForgotPasswordDialog({ open, handleClose, setOpen }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordReset = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5005/api/forgot-password', {
        email,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset link has been sent to your email');
        setErrorMessage('');
        setEmail(''); // Clear the email field after successful request
        setTimeout(() => {
          setSuccessMessage('');
          setOpen(false);  // Close the dialog after success
        }, 3000);
      } else {
        setErrorMessage('Failed to send password reset link: ' + response.data);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error: ' + (error.response?.data || error.message));
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your email address to request a password reset.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {loading && <CircularProgress size={24} sx={{ color: 'primary.main', mt: 2 }} />}
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <AlertTitle>Success</AlertTitle>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>Cancel</Button>
        <Button onClick={handlePasswordReset} disabled={loading}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
