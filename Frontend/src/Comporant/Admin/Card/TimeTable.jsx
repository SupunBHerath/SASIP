import React, { useState } from 'react';
import './Card.css';
import { Color } from '../../CSS/Css.jsx';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';

const TimeTable = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState(props.image);
  const [imageFile, setImageFile] = useState(null);

  const handleImageClick = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
   
    setShowDialog(false);
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    height: 'auto',
    textAlign: 'center'
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
    marginBottom: '8px'
  };

  const textStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    lineHeight: '1.5',
    marginBottom: '8px',
    color: Color.SecondaryColor,
  };

  return (
    <div style={cardStyle}>
      <div style={textStyle} className='text-bg-success p-1 mt-2 w-100'>
        {props.title}
      </div>
      <img src={imageUrl} alt="Description" style={imageStyle} onClick={handleImageClick} />

      <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Image</DialogTitle>
        <DialogContent>
        
          <TextField
            margin="dense"
            id="file"
            label="Update new  Image"
            type="file"
            fullWidth
            variant="outlined"
            onChange={handleImageChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
            <DialogContentText>
            <img src={imageUrl} alt="Preview" style={{ width: '100%', height: 'auto', marginBottom: '15px' }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeTable;
