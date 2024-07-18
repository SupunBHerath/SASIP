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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const sampleData = [
  { id: 1, lid:'', name: 'John Doe', contact: '123-456-7890', visible: true, rank: 1 },
  { id: 2, lid:'', name: 'Jane Smith', contact: '987-654-3210', visible: false, rank: 2 },
  // Add more sample data as needed
];

const TeacherTable = () => {
  const [teachers, setTeachers] = useState(sampleData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [editedTeacherName, setEditedTeacherName] = useState('');
  const [editedLID, setEditedLID] = useState('');
  const [editedTeacherContact, setEditedTeacherContact] = useState('');
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    lid: '',
    contact: '',
    subject: '',
    classType: [],
    medium: [],
    bio: '',
    qualifications: [],
    socialMedia: {
      youtube: '',
      facebook: '',
      website: '',
    },
  });

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
    setEditedLID(teacher.lid);
    setEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (selectedTeacher) {
      const updatedTeachers = teachers.map((t) =>
        t.id === selectedTeacher.id
          ? { ...t, name: editedTeacherName, contact: editedTeacherContact , lid: editedLID}
          : t
      );
      setTeachers(updatedTeachers);
      setEditDialogOpen(false);
      setSelectedTeacher(null);
      setEditedTeacherName('');
      setEditedLID('');
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

  const handleAddNewTeacher = () => {
    setAddDialogOpen(true);
  };

  const handleAddTeacherConfirm = () => {
    const newTeacherId = teachers.length ? Math.max(...teachers.map((t) => t.id)) + 1 : 1;
    const updatedTeachers = [
      ...teachers,
      { id: newTeacherId, ...newTeacher, visible: true, rank: teachers.length + 1 },
    ];
    setTeachers(updatedTeachers);
    setAddDialogOpen(false);
    setNewTeacher({
      name: '',
      contact: '',
      subject: '',
      classType: [],
      medium: [],
      bio: '',
      qualifications: [],
      socialMedia: {
        youtube: '',
        facebook: '',
        website: '',
      },
    });
  };

  const handleNewTeacherChange = (field, value) => {
    setNewTeacher((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddQualification = () => {
    setNewTeacher((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { name: '', description: '', icon: '' }],
    }));
  };

  const handleQualificationChange = (index, field, value) => {
    setNewTeacher((prev) => {
      const updatedQualifications = [...prev.qualifications];
      updatedQualifications[index] = { ...updatedQualifications[index], [field]: value };
      return { ...prev, qualifications: updatedQualifications };
    });
  };

  const handleUploadIcon = (index, file) => {
    // Here you can handle the file upload logic, for simplicity, setting icon path
    const url = URL.createObjectURL(file);
    handleQualificationChange(index, 'icon', url);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNewTeacher}
        style={{ marginBottom: 10 }}
      >
        Add New Teacher
      </Button>

      <TableContainer component={Paper} className="shadow-sm border border-danger-subtle">
        <div className="p-2">
          <TextField
            label="Filter by Teacher Name"
            variant="outlined"
            size="small"
            value={filterValue}
            onChange={handleFilterChange}
            style={{ marginBottom: 10 }}
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Lecturer's ID </TableCell>
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
                <TableCell>{teacher.lid}</TableCell>
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
          {selectedTeacher && selectedTeacher.visible ? 'Hide Teacher' : 'Show Teacher'}
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
            label="Lecturer's ID"
            variant="outlined"
            fullWidth
            value={editedLID}
            onChange={(e) => setEditedLID(e.target.value)}
            style={{ marginBottom: 10 }}
          />
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

      {/* Add Teacher Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Lecturer </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={newTeacher.name}
                onChange={(e) => handleNewTeacherChange('name', e.target.value)}
                style={{ marginBottom: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                value={newTeacher.contact}
                onChange={(e) => handleNewTeacherChange('contact', e.target.value)}
                style={{ marginBottom: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                value={newTeacher.subject}
                onChange={(e) => handleNewTeacherChange('subject', e.target.value)}
                style={{ marginBottom: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" style={{ marginBottom: 10 }}>
                <InputLabel>Type of Class </InputLabel>
                <Select
                  multiple
                  value={newTeacher.classType}
                  onChange={(e) => handleNewTeacherChange('classType', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Physical">Physical  </MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Spacial">Spacial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" style={{ marginBottom: 10 }}>
                <InputLabel>Medium</InputLabel>
                <Select
                  multiple
                  value={newTeacher.medium}
                  onChange={(e) => handleNewTeacherChange('medium', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Sinhala">Sinhala</MenuItem>
                  <MenuItem value="Tamil">Tamil</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={newTeacher.bio}
                onChange={(e) => handleNewTeacherChange('bio', e.target.value)}
                style={{ marginBottom: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup style={{ marginBottom: 10 }}>
                <TextField
                  label="YouTube Link"
                  variant="outlined"
                  value={newTeacher.socialMedia.youtube}
                  onChange={(e) =>
                    handleNewTeacherChange('socialMedia', {
                      ...newTeacher.socialMedia,
                      youtube: e.target.value,
                    })
                  }
                  style={{ marginBottom: 10 }}
                />
                <TextField
                  label="Facebook Link"
                  variant="outlined"
                  value={newTeacher.socialMedia.facebook}
                  onChange={(e) =>
                    handleNewTeacherChange('socialMedia', {
                      ...newTeacher.socialMedia,
                      facebook: e.target.value,
                    })
                  }
                  style={{ marginBottom: 10 }}
                />
                <TextField
                  label="Website Link"
                  variant="outlined"
                  value={newTeacher.socialMedia.website}
                  onChange={(e) =>
                    handleNewTeacherChange('socialMedia', {
                      ...newTeacher.socialMedia,
                      website: e.target.value,
                    })
                  }
                  style={{ marginBottom: 10 }}
                />
              </FormGroup>
            </Grid>

            {/* Qualifications */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddQualification}
                style={{ marginBottom: 10 }}
              >
                Add Qualification
              </Button>
              {newTeacher.qualifications.map((qualification, index) => (

                <div key={index} style={{ marginBottom: 10 }}>
                  <TextField
                    label="Qualification Name"
                    variant="outlined"
                    fullWidth
                    value={qualification.name}
                    onChange={(e) =>
                      handleQualificationChange(index, 'name', e.target.value)
                    }
                    style={{ marginBottom: 5 }}
                  />
                  <TextField
                    label="Qualification Description"
                    variant="outlined"
                    fullWidth
                    value={qualification.description}
                    onChange={(e) =>
                      handleQualificationChange(index, 'description', e.target.value)
                    }
                    style={{ marginBottom: 5 }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadIcon(index, e.target.files[0])}
                    style={{ marginBottom: 5 }}
                  />
                  {qualification.icon && (
                    <Avatar
                      alt={qualification.name}
                      src={qualification.icon}
                      style={{ marginLeft: 10 }}
                    />
                  )}
                  <br />
                  <br />
                  <hr />

                </div>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTeacherConfirm} color="primary">
            ADD Lecturer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherTable;
