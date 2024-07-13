import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// Dummy data for the table
const dummyData = [
  { id: 1, subject: 'Mathematics', stream: 'Science', visible: true },
  { id: 2, subject: 'Physics', stream: 'Science', visible: false },
  { id: 3, subject: 'Chemistry', stream: 'Science', visible: true },
  { id: 4, subject: 'Biology', stream: 'Science', visible: false },
  { id: 5, subject: 'English', stream: 'Arts', visible: true },
  { id: 6, subject: 'History', stream: 'Arts', visible: true },
  { id: 7, subject: 'Geography', stream: 'Arts', visible: false },
  { id: 8, subject: 'Philosophy', stream: 'Arts', visible: true },
];

const Subject = () => {
  const [data, setData] = useState(dummyData);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newStream, setNewStream] = useState('');
  const [newVisible, setNewVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleAddClick = () => {
    setEditMode(false);
    setOpen(true);
  };

  const handleEditClick = (id) => {
    const subject = data.find((item) => item.id === id);
    setCurrentId(id);
    setNewSubject(subject.subject);
    setNewStream(subject.stream);
    setNewVisible(subject.visible);
    setEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSubject('');
    setNewStream('');
    setNewVisible(true);
    setCurrentId(null);
  };

  const handleFormSubmit = () => {
    if (editMode) {
      setData(data.map((item) => (item.id === currentId ? { ...item, subject: newSubject, stream: newStream, visible: newVisible } : item)));
    } else {
      const newId = data.length ? data[data.length - 1].id + 1 : 1;
      const newEntry = {
        id: newId,
        subject: newSubject,
        stream: newStream,
        visible: newVisible,
      };
      setData([...data, newEntry]);
    }
    handleClose();
  };

  const handleToggleVisibility = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, visible: !item.visible };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      (item.subject.toLowerCase().includes(searchTerm.toLowerCase()) || item.stream.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter ? item.stream === filter : true)
    );
  });

  return (
    <Container sx={{ paddingY: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleAddClick} sx={{ marginRight: 2 }}>
            Add Subject
          </Button>
          <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>
            Filter
          </Button>
          <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel>Stream</InputLabel>
            <Select value={filter} onChange={handleFilterChange} label="Stream">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Arts">Arts</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', padding: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>No</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>Subject Name</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>Stream</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>Visible</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ textAlign: 'center' }}>{item.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.subject}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.stream}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton onClick={() => handleToggleVisibility(item.id)}>
                    <VisibilityIcon color={item.visible ? 'primary' : 'action'} />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(item.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to {editMode ? 'edit the' : 'add a new'} subject.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Stream"
            type="text"
            fullWidth
            value={newStream}
            onChange={(e) => setNewStream(e.target.value)}
          />
          <Box display="flex" alignItems="center" marginTop={2}>
            <Typography>Visible:</Typography>
            <IconButton onClick={() => setNewVisible(!newVisible)}>
              <VisibilityIcon color={newVisible ? 'primary' : 'action'} />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Subject;
