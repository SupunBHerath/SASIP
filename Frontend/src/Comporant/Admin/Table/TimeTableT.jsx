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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Pagination from '@mui/material/Pagination';

const sampleData = [
    { id: 1, stream: 'Science', status: 'Active', imageUrl: 'https://example.com/science.jpg' },
    { id: 2, stream: 'Arts', status: 'Inactive', imageUrl: 'https://example.com/arts.jpg' },
    // Add more sample data as needed
];

const TimeTableT = () => {
    const [timeTables, setTimeTables] = useState(sampleData);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedTimeTable, setSelectedTimeTable] = useState(null);
    const [editedStream, setEditedStream] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [file, setFile] = useState(null); // State to hold selected file
    const [page, setPage] = useState(1); // Current page state
    const rowsPerPage = 5; // Number of rows per page

    const handleDeleteClick = (timeTable) => {
        setSelectedTimeTable(timeTable);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedTimeTable) {
            const updatedTimeTables = timeTables.filter((tt) => tt.id !== selectedTimeTable.id);
            setTimeTables(updatedTimeTables);
            setDeleteDialogOpen(false);
            setSelectedTimeTable(null);
        }
    };

    const handleEditClick = (timeTable) => {
        setSelectedTimeTable(timeTable);
        setEditedStream(timeTable.stream);
        setEditedStatus(timeTable.status);
        setEditedImageUrl(timeTable.imageUrl);
        setEditDialogOpen(true);
    };

    const handleEditConfirm = () => {
        if (selectedTimeTable) {
            const updatedTimeTables = timeTables.map((tt) =>
                tt.id === selectedTimeTable.id
                    ? { ...tt, stream: editedStream, status: editedStatus, imageUrl: editedImageUrl }
                    : tt
            );
            setTimeTables(updatedTimeTables);
            setEditDialogOpen(false);
            setSelectedTimeTable(null);
            setEditedStream('');
            setEditedStatus('');
            setEditedImageUrl('');
        }
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedTimeTable(null);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setImageDialogOpen(true);
    };

    const handleCloseImageDialog = () => {
        setImageDialogOpen(false);
        setSelectedImageUrl('');
    };

    const handleSelectImageFromGallery = () => {
        // Open file picker dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = () => {
                    setFile(selectedFile);
                    setEditedImageUrl(reader.result); // Set image preview
                };
            }
        };
        input.click();
    };

    const handleAddNewTimeTable = () => {
        setAddDialogOpen(true);
    };

    const handleAddConfirm = () => {
        // Here you would implement logic to add a new time table entry to the state
        // For demonstration, creating a new time table object with dummy data
        const newTimeTable = {
            id: timeTables.length + 1,
            stream: editedStream,
            status: editedStatus,
            imageUrl: editedImageUrl || 'https://example.com/default.jpg', // Placeholder for image
        };

        setTimeTables([...timeTables, newTimeTable]);
        setAddDialogOpen(false);
        setEditedStream('');
        setEditedStatus('');
        setEditedImageUrl('');
        setFile(null); // Reset file state
    };

    // Calculate pagination
    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = timeTables.slice(indexOfFirstRow, indexOfLastRow);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            {/* Add New Time Table Button */}
           <br />
            <TableContainer component={Paper} className='shadow-sm border border-danger-subtle' >
                <div className="p-2">
                <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={handleAddNewTimeTable}
            >
                Add New Time Table
            </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Stream</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((timeTable, index) => (
                            <TableRow key={timeTable.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{timeTable.stream}</TableCell>
                                <TableCell>
                                    <img
                                        src={timeTable.imageUrl}
                                        alt={timeTable.stream}
                                        style={{ width: 100, height: 'auto', cursor: 'pointer' }}
                                        onClick={() => handleImageClick(timeTable.imageUrl)}
                                    />
                                </TableCell>
                                <TableCell>{timeTable.status}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(timeTable)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(timeTable)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <Pagination
                    count={Math.ceil(timeTables.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    style={{ marginTop: 20, textAlign: 'center' }}
                />

            </div>

            {/* Add New Time Table Dialog */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add New Time Table</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Stream"
                        variant="outlined"
                        fullWidth
                        value={editedStream}
                        onChange={(e) => setEditedStream(e.target.value)}
                        style={{ marginBottom: 10 }}
                    />
                    <FormControl variant="outlined" fullWidth style={{ marginBottom: 10 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                            label="Status"
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ marginBottom: 10 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddPhotoAlternateIcon />}
                            onClick={handleSelectImageFromGallery}
                        >
                            Select Image
                        </Button>
                        {editedImageUrl && (
                            <img
                                src={editedImageUrl}
                                alt="Selected Image"
                                style={{ width: 100, height: 'auto', marginLeft: 20 }}
                            />
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddConfirm} color="primary">
                        Add Time Table
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Time Table</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this time table?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Time Table Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false) } >
                <DialogTitle>Edit Time Table</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        label="Stream"
                        variant="outlined"
                        fullWidth
                        value={editedStream}
                        onChange={(e) => setEditedStream(e.target.value)}
                        style={{ marginBottom: 10 }}
                    />
                    <br /><br />
                    <FormControl variant="outlined" fullWidth style={{ marginBottom: 10 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                            label="Status"
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ marginBottom: 10 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddPhotoAlternateIcon />}
                            onClick={handleSelectImageFromGallery}
                        >
                            Select Image
                        </Button>
                        <br /><br />
                        {editedImageUrl && (
                            <img
                                src={editedImageUrl}
                                alt="Selected Image"
                                style={{ width: 100, height: '80px' , margin:'auto' }}
                            />
                        )}
                    </div>
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

            {/* Image Dialog */}
            <Dialog open={imageDialogOpen} onClose={handleCloseImageDialog}>
                <DialogContent>
                    <img src={selectedImageUrl} alt="Time Table" style={{ width: '100%' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImageDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
};

export default TimeTableT;

