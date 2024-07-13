import React, { useState } from 'react';
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
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, InputAdornment } from '@mui/material';
import AlbumDialog from './click-album';
import SearchIcon from '@mui/icons-material/Search'; 
import Pagination from '@mui/material/Pagination';

// Dummy album data with images
const dummyAlbums = [
  { id: 1, title: 'Album 1', cover: 'https://picsum.photos/150?random=1?text=Album+1', images: [
    'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  ] },
  { id: 2, title: 'Album 2', cover: 'https://picsum.photos/150?random=2?text=Album+2', images: [
    'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  ] },
  { id: 3, title: 'Album 3', cover: 'https://picsum.photos/150?random=3?text=Album+3', images: [
    'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  ] },
  { id: 4, title: 'Album 4', cover: 'https://picsum.photos/150?random=4?text=Album+4', images: [
    'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  ] },
  { id: 5, title: 'Album 5', cover: 'https://picsum.photos/150?random=5?text=Album+5', images: [
    'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  ] },
  // Add more dummy albums as needed
];

const StyledCard = styled(Card)({
    maxWidth: 320,  // Slightly increased width
    maxHeight: 320, // Slightly increased height
    margin: 'auto',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',  // Enhanced shadow for more depth
    borderRadius: '12px',  // Slightly larger radius for a more modern look
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Smooth transition for hover effects
    '&:hover': {
      transform: 'scale(1.05)',  // Slightly enlarge the card on hover
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',  // Darker shadow on hover
    },
  });
  

// Styled Button
const StyledButton = styled(Button)({
  position: 'relative',
  left: '70px',
  zIndex: 1000,
});

// Styled Search Bar
const SearchBar = styled(TextField)({
  minWidth: '300px',
  left: '50px',
});

// Styled Filter Button
const FilterButton = styled(Button)({
  marginRight: '16px',
  marginLeft: '80px'
});

// Container for the search bar, filter button, and add button
const ActionsContainer = styled(Box)({
  display: 'flex 1',
  alignItems: 'center',
  marginBottom: '10px',
  gap: '16px',  // Added gap for spacing
  justifyContent: 'center',  // Center the items horizontally
});

const AddAlbumButtonWithAlbums = () => {
  const [open, setOpen] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState(dummyAlbums);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 8;

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

    // Create previews for selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('Album Name:', albumName);
    console.log('Selected Images:', selectedImages);
    handleClose();
  };

  const handleOpenAlbumDialog = (album) => {
    setSelectedAlbum(album);
    setOpenAlbumDialog(true);
  };

  const handleCloseAlbumDialog = () => {
    setOpenAlbumDialog(false);
    setSelectedAlbum(null);
  };

  const handleAddImagesToAlbum = (newImages) => {
    // Update the selected album with new images
    if (selectedAlbum) {
      selectedAlbum.images = [...selectedAlbum.images, ...newImages];
      setSelectedAlbum({ ...selectedAlbum });
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    // Filter albums based on the search query
    const filtered = dummyAlbums.filter((album) =>
      album.title.toLowerCase().includes(query)
    );
    setFilteredAlbums(filtered);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const handleFilterClick = () => {
    // Implement filter logic here
    console.log('Filter button clicked');
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
      <ActionsContainer>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Album
        </StyledButton>
        <FilterButton
          variant="contained"
          color="secondary"
          onClick={handleFilterClick}
        >
          Filter
        </FilterButton>
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Album</DialogTitle>
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
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Container sx={{ paddingY: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {getPaginatedAlbums().map((album) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={album.id}>
              <StyledCard onClick={() => handleOpenAlbumDialog(album)}>
                <CardMedia
                  component="img"
                  height="220"
                  image={album.cover}
                  alt={album.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" textAlign="center">
                    {album.title}
                  </Typography>
                </CardContent>
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
                marginTop: 4,  // Adjust the space above the pagination
                marginBottom: 4,  // Adjust the space below the pagination
                display: 'flex',
                justifyContent: 'end',
                '& .MuiPaginationItem-root': {
                backgroundColor: '#f5f5f5',  // Background color of pagination items
                borderRadius: '50%',  // Circular pagination items
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',  // Subtle shadow for depth
                '&:hover': {
                    backgroundColor: '#e0e0e0',  // Hover background color
                },
                },
                '& .Mui-selected': {
                backgroundColor: '#007bff',  // Background color of the selected page
                color: '#fff',  // Text color of the selected page
                '&:hover': {
                    backgroundColor: '#0056b3',  // Hover background color of the selected page
                },
                },
            }}
            />

      </Container>

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
