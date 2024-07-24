import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container, Grid, Card, CardMedia, Typography, Box, InputAdornment } from '@mui/material';
import AlbumDialog from './click-album';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

// Styled components
const StyledCard = styled(Card)({
  maxWidth: 320,
  maxHeight: 350,
  margin: 'auto',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  borderRadius: '40px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
    borderColor: '#bbb',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '5px',
    backgroundColor: '#FF8C00',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
});

const AlbumCover = styled(CardMedia)({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 0.8,
  },
});

const AlbumTitleOverlay = styled(Typography)({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  padding: '20px',
  background: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  textAlign: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  borderTop: '3px solid #ffffff',
});

const StyledButton = styled(Button)({
  position: 'relative',
  zIndex: 1000,
  height: 54,
  width: 160,
  left: 60,
  background: 'linear-gradient(45deg, #FF6F61, #FFCC00, #6B5B95, #88B04B)',
  backgroundSize: '400% 400%',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  color: '#fff',
  fontWeight: 'bold',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
    animation: 'gradientShift 3s ease infinite',
  },
  '&:focus': {
    outline: 'none',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

const gradientShift = `
  @keyframes gradientShift {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

const SearchBar = styled(TextField)({
  minWidth: '920px',
  left: '100px',
});

const ActionsContainer = styled(Box)({
  display: 'flex 1',
  alignItems: 'center',
  marginBottom: '10px',
  gap: '16px',
  justifyContent: 'center',
});

const SpinnerContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
});

// Main component
const AddAlbumButtonWithAlbums = () => {
  const [open, setOpen] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [albumCover, setAlbumCover] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 8;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch albums data from the backend when the component mounts
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('/api/display-albums');
        setAlbums(response.data.albums);
        setFilteredAlbums(response.data.albums);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setError('Failed to fetch albums');
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlbumNameChange = (event) => {
    setAlbumName(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    if (previews.length > 0) {
      setAlbumCover(previews[0]);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!albumName || selectedImages.length === 0) {
      setError('Album name and images are required');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', albumName);
      formData.append('cover', albumCover); // Add album cover to form data
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });
      const response = await axios.post('/api/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setSuccess('Album created successfully');
        setError('');
        setSelectedImages([]);
        setImagePreviews([]);
        setAlbumName('');
        setAlbumCover(''); // Reset album cover
        setTimeout(() => {
          handleClose();
          fetchAlbums(); // Fetch albums again to reflect the new album
        }, 2000);
      } else {
        setError('Failed to create album');
      }
    } catch (error) {
      setError('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAlbumDialog = (album) => {
    setSelectedAlbum(album);
    setOpenAlbumDialog(true);
  };

  const handleCloseAlbumDialog = () => {
    setOpenAlbumDialog(false);
    setSelectedAlbum(null);
  };

  const handleAddImagesToAlbum = async (newImages) => {
    if (selectedAlbum) {
      try {
        await axios.post(`/api/albums/${selectedAlbum.name}/add-images`, { images: newImages });
        const updatedAlbum = { ...selectedAlbum, images: [...selectedAlbum.images, ...newImages] };
        setSelectedAlbum(updatedAlbum);
        setAlbums(albums.map(album => album.name === updatedAlbum.name ? updatedAlbum : album));
        setFilteredAlbums(filteredAlbums.map(album => album.name === updatedAlbum.name ? updatedAlbum : album));
      } catch (error) {
        console.error('Error adding images to album:', error);
        setError('Failed to add images to album');
      }
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = albums.filter((album) =>
      album.name.toLowerCase().includes(query)
    );
    setFilteredAlbums(filtered);
    setCurrentPage(1);
  };

  const getPaginatedAlbums = () => {
    const startIndex = (currentPage - 1) * albumsPerPage;
    const endIndex = startIndex + albumsPerPage;
    return filteredAlbums.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <style>{gradientShift}</style>
      <ActionsContainer>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Album
        </StyledButton>
        <SearchBar
          variant="outlined"
          placeholder="Search Albums"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </ActionsContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{
        '& .MuiPaper-root': {
          border: '3px solid #FF8C00',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '3px solid #FF8C00',
            borderRadius: 'inherit',
            boxSizing: 'border-box',
            zIndex: -1,
            animation: 'pulse 2s infinite',
          },
        },
      }}>
        <DialogTitle sx={{
          position: 'relative',
          borderBottom: '2px solid blue',
          paddingBottom: '16px',
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#FF8C00'
        }}>Add New Album</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the album name and select images from your device gallery.
          </DialogContentText>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Album Name"
              type="text"
              fullWidth
              value={albumName}
              onChange={handleAlbumNameChange}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ marginTop: '16px', display: 'block' }}
            />
            <ImageList cols={3} style={{ marginTop: '16px' }}>
              {imagePreviews.map((src, index) => (
                <ImageListItem key={index}>
                  <img src={src} alt={`preview-${index}`} />
                </ImageListItem>
              ))}
            </ImageList>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </DialogActions>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </DialogContent>
      </Dialog>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress
            size={80}
            sx={{ color: '#FF8C00' }}  // Customize spinner color
          />
        </SpinnerContainer>
      ) : (

      <Container sx={{ paddingY: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {getPaginatedAlbums().map((album) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={album.id}>
              <StyledCard onClick={() => handleOpenAlbumDialog(album)}>
                <AlbumCover
                  component="img"
                  image={album.coverUrl}
                  sx={{
                    height: 350, 
                  }}
                  alt={album.name}
                />
                <AlbumTitleOverlay>
                  {album.name}
                </AlbumTitleOverlay>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(filteredAlbums.length / albumsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: 'flex',
            justifyContent: 'end',
            '& .MuiPaginationItem-root': {
              backgroundColor: '#FF8C00',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#007bff',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            },
          }}
        />
      </Container>
      )}
      {selectedAlbum && (
        <AlbumDialog
          open={openAlbumDialog}
          onClose={handleCloseAlbumDialog}
          album={selectedAlbum}
          onAddImages={handleAddImagesToAlbum}
        />
      )}
    </div>
  );
};

export default AddAlbumButtonWithAlbums;
