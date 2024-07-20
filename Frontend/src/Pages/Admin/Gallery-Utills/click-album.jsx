import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { Menu, MenuItem } from '@mui/material';
import axios from 'axios';

// Define keyframes for pulse effect
const pulseAnimation = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const AlbumDialog = ({ open, onClose, album, onAddImages }) => {
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]); // Track image previews
  const [deleteImage, setDeleteImage] = useState(null); // State to keep track of the image to delete
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // State to control the delete confirmation dialog
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the Share menu
  const [fullScreenImage, setFullScreenImage] = useState(''); // State to manage the full-screen image view

  useEffect(() => {
    console.log('Album data:', album);
    if (album?.images) {
      album.images.forEach((image, index) => {
        console.log(`Image ${index + 1} URL:`, image.url);
      });
    }
  }, [album]);

  const handleShare = (src) => {
    if (navigator.share) {
      navigator.share({
        title: album?.name, // Changed from `album.title` to `album.name`
        url: src,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      setAnchorEl(src); // Open the Share menu
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the Share menu
  };

  const handleShareOption = (platform, src) => {
    handleMenuClose();
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(src)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(src)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(album?.name)}&body=${encodeURIComponent(src)}`, '_self');
        break;
      default:
        break;
    }
  };

  const handleDelete = (src) => {
    setDeleteImage(src); 
    setOpenDeleteConfirm(true); 
  };

  const confirmDelete = async () => {
    try {
      await axios.delete('/api/albums/delete-image', { data: { albumId: album?.name, imageSrc: deleteImage } });
      onClose(); 
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setDeleteImage(null); 
      setOpenDeleteConfirm(false); 
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImages(files);

    // Create image previews
    const previews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(previews);
  };

  const handleAddImages = async () => {
    if (newImages.length > 0) {
      const formData = new FormData();
      newImages.forEach(file => formData.append('images', file));
      formData.append('albumId', album?.name);

      try {
        await axios.post('/api/albums/add-images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        onAddImages(newImages.map(file => URL.createObjectURL(file)));
        setNewImages([]);
        setNewImagePreviews([]); // Clear previews after upload
      } catch (error) {
        console.error('Error adding images:', error);
      }
    }
  };

  return (
    <>
      {/* Adding a style tag to inject keyframes for the animation */}
      <style>{pulseAnimation}</style>

      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{
          '& .MuiPaper-root': {
            border: '3px solid #FF8C00', // Add border with orange color
            borderRadius: '8px', // Optional: Add border radius
          },
        }}>
        <DialogTitle
          sx={{
            position: 'relative',
            borderBottom: '2px solid blue', // Add blue border to the title
            paddingBottom: '16px',
            textAlign: 'center',
            color: '#FF8C00',
            fontSize: '1.6rem'
          }}
        >
          {album?.name} {/* Changed from `album.title` to `album.name` */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'primary.main',
            }}
            onClick={() => document.getElementById('upload').click()}
            aria-label="add images"
          >
            <AddPhotoAlternateIcon sx={{ fontSize: 30 }} /> {/* Increase icon size */}
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ImageList cols={3} gap={8}>
            <ImageListItem key="Subheader" cols={3}>
              <ListSubheader component="div">Album Images</ListSubheader>
            </ImageListItem>
            {album?.images.map((image, index) => (
              <ImageListItem key={index} sx={{ position: 'relative' }}>
                <img
                  src={`${image.url}`}
                  alt={`image-${index}`}
                  loading="lazy"
                  onClick={() => setFullScreenImage(image.url)} // Set the clicked image as the full-screen image
                  style={{ cursor: 'pointer' }} // Add a pointer cursor for the clickable image
                />
                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: 'yellow',
                        animation: 'pulse 1s infinite',
                      },
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      marginBottom: 1,
                      p: 0.5,
                    }}
                    onClick={() => handleShare(image.url)}
                    aria-label={`share image ${index}`}
                  >
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: 'red',
                        animation: 'pulse 1s infinite',
                      },
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      p: 0.5,
                    }}
                    onClick={() => handleDelete(image.url)}
                    aria-label={`delete image ${index}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ImageListItem>
            ))}
            {newImagePreviews.map((preview, index) => (
              <ImageListItem key={`new-${index}`} sx={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt={`new-image-${index}`}
                  style={{ cursor: 'pointer' }}
                />
                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      p: 0.5,
                    }}
                    disabled
                  >
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      p: 0.5,
                    }}
                    disabled
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
          <input
            id="upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleAddImages} disabled={newImages.length === 0} color="primary">
            Add Images
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Screen Image View */}
      <Dialog
        open={Boolean(fullScreenImage)}
        onClose={() => setFullScreenImage('')}
        maxWidth="md"
        fullWidth
      >
        <img
          src={fullScreenImage}
          alt="Full screen"
          style={{ width: '100%', height: 'auto' }}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Menu */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleShareOption('facebook', anchorEl)}>Share on Facebook</MenuItem>
        <MenuItem onClick={() => handleShareOption('whatsapp', anchorEl)}>Share on WhatsApp</MenuItem>
        <MenuItem onClick={() => handleShareOption('email', anchorEl)}>Share via Email</MenuItem>
      </Menu>
    </>
  );
};

export default AlbumDialog;
