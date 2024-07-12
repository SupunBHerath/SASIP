import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

const sampleData = [
  { id: 1, name: 'John Doe', contact: '123-456-7890', visible: true, rank: 1 },
  { id: 2, name: 'Jane Smith', contact: '987-654-3210', visible: false, rank: 2 },
  // Add more sample data as needed
];

const TeacherTable = () => {
  const [teachers, setTeachers] = useState(sampleData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [editedTeacherName, setEditedTeacherName] = useState('');
  const [editedTeacherContact, setEditedTeacherContact] = useState('');

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTeacher) {
      const updatedTeachers = teachers.filter((t) => t.id !== selectedTeacher.id);
      setTeachers(updatedTeachers);
      setDeleteDialogOpen(false);
      setSelectedTeacher(null);
    }
  };

  const handleVisibilityToggle = (teacher) => {
    setSelectedTeacher(teacher);
    setDeleteDialogOpen(true); // Open status change confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedTeacher(null);
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setEditedTeacherName(teacher.name);
    setEditedTeacherContact(teacher.contact);
    setEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (selectedTeacher) {
      const updatedTeachers = teachers.map((t) =>
        t.id === selectedTeacher.id
          ? { ...t, name: editedTeacherName, contact: editedTeacherContact }
          : t
      );
      setTeachers(updatedTeachers);
      setEditDialogOpen(false);
      setSelectedTeacher(null);
      setEditedTeacherName('');
      setEditedTeacherContact('');
    }
  };

  const handleStatusChangeConfirm = (confirm) => {
    if (confirm && selectedTeacher) {
      const updatedTeachers = teachers.map((t) =>
        t.id === selectedTeacher.id ? { ...t, visible: !t.visible } : t
      );
      setTeachers(updatedTeachers);
    }
    setSelectedTeacher(null);
    setDeleteDialogOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Filter by Teacher Name"
        variant="outlined"
        size="small"
        value={filterValue}
        onChange={handleFilterChange}
        style={{ marginBottom: 10 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Teacher Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers.map((teacher, index) => (
              <TableRow key={teacher.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar alt={teacher.name} src={`https://example.com/${teacher.id}.jpg`} />
                </TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.contact}</TableCell>
                <TableCell>{teacher.rank}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleVisibilityToggle(teacher)}>
                    {teacher.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(teacher)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteClick(teacher)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>
          {selectedTeacher && selectedTeacher.visible
            ? 'Hide Teacher'
            : 'Show Teacher'}
        </DialogTitle>
        <DialogContent>
          <p>
            {selectedTeacher && selectedTeacher.visible
              ? `Are you sure you want to hide ?`
              : `Are you sure you want to show ?`}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleStatusChangeConfirm(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Teacher Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editedTeacherName}
            onChange={(e) => setEditedTeacherName(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            value={editedTeacherContact}
            onChange={(e) => setEditedTeacherContact(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherTable;
