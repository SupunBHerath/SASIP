import React, { useState } from 'react';
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

// AlbumDialog Component
const AlbumDialog = ({ open, onClose, album, onAddImages }) => {
  const [newImages, setNewImages] = useState([]);
  const [deleteImage, setDeleteImage] = useState(null); // State to keep track of the image to delete
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // State to control the delete confirmation dialog
  const [anchorEl, setAnchorEl] = React.useState(null); // State to manage the Share menu

  const handleShare = (src) => {
    if (navigator.share) {
      navigator.share({
        title: album?.title,
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
        window.open(`mailto:?subject=${encodeURIComponent(album?.title)}&body=${encodeURIComponent(src)}`, '_self');
        break;
      default:
        break;
    }
  };

  const handleDelete = (src) => {
    setDeleteImage(src); // Set the image to be deleted
    setOpenDeleteConfirm(true); // Open the confirmation dialog
  };

  const confirmDelete = () => {
    console.log(`Deleted image: ${deleteImage}`);
    // Add delete logic here
    setDeleteImage(null); // Clear the image to be deleted
    setOpenDeleteConfirm(false); // Close the confirmation dialog
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImages(files);
  };

  const handleAddImages = () => {
    if (newImages.length > 0) {
      const previews = newImages.map((file) => URL.createObjectURL(file));
      onAddImages(previews);
      setNewImages([]);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            position: 'relative',
            borderBottom: '2px solid blue', // Add blue border to the title
            paddingBottom: '16px',
          }}
        >
          {album?.title}
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
            <AddPhotoAlternateIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ImageList cols={3} gap={8}>
            <ImageListItem key="Subheader" cols={3}>
              <ListSubheader component="div">Album Images</ListSubheader>
            </ImageListItem>
            {album?.images.map((src, index) => (
              <ImageListItem key={index} sx={{ position: 'relative' }}>
                <img
                  srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${src}?w=248&fit=crop&auto=format`}
                  alt={`image-${index}`}
                  loading="lazy"
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'white',
                  }}
                  onClick={() => handleShare(src)}
                  aria-label={`share image ${index}`}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 40,
                    color: 'white',
                  }}
                  onClick={() => handleDelete(src)}
                  aria-label={`delete image ${index}`}
                >
                  <DeleteIcon />
                </IconButton>
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
          <Button onClick={handleAddImages} color="primary">
            Add Images
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Share Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleShareOption('facebook', anchorEl)}>
          Share on Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShareOption('whatsapp', anchorEl)}>
          Share on WhatsApp
        </MenuItem>
        <MenuItem onClick={() => handleShareOption('email', anchorEl)}>
          Share via Email
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          border: '2px solid blue', // Add blue border
          borderRadius: '8px', // Optional: add border radius for rounded corners
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '2px solid blue', // Add blue border to the title
            paddingBottom: '16px',
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlbumDialog;
