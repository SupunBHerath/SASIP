import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControl, Select, MenuItem
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

const StreamTable = () => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editedStream, setEditedStream] = useState('');
    const [editedSubject, setEditedSubject] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [newStream, setNewStream] = useState('');
    const [newSubject, setNewSubject] = useState('');
    const [newStatus, setNewStatus] = useState('visible');
    const [data, setData] = useState([
        { no: 1, stream: 'Science', subject: 'Physics', status: 'visible' },
        { no: 2, stream: 'Arts', subject: 'History', status: 'invisible' },
        // Add more sample data as needed
    ]);

    const handleOpenEditDialog = (row) => {
        setSelectedRow(row);
        setEditedStream(row.stream);
        setEditedSubject(row.subject);
        setEditedStatus(row.status);
        setOpenEditDialog(true);
    };

    const handleOpenDeleteDialog = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
    };

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleClose = () => {
        setOpenEditDialog(false);
        setOpenDeleteDialog(false);
        setOpenAddDialog(false);
        setSelectedRow(null);
        setEditedStream('');
        setEditedSubject('');
        setEditedStatus('');
        setNewStream('');
        setNewSubject('');
        setNewStatus('');
    };

    const handleEdit = () => {
        const updatedData = data.map(item =>
            item.no === selectedRow.no
                ? { ...item, stream: editedStream, subject: editedSubject, status: editedStatus }
                : item
        );
        setData(updatedData);
        handleClose();
    };

    const handleDelete = () => {
        setData(data.filter(item => item.no !== selectedRow.no));
        handleClose();
    };

    const handleAdd = () => {
        const newNo = data.length ? data[data.length - 1].no + 1 : 1;
        const newData = { no: newNo, stream: newStream, subject: newSubject, status: newStatus };
        setData([...data, newData]);
        handleClose();
    };

    return (
        <TableContainer component={Paper} className='shadow-sm border border-danger-subtle'>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenAddDialog}
                sx={{ m: 2 }}
            >
                Add New Subject
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Stream</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.no}>
                            <TableCell>{row.no}</TableCell>
                            <TableCell>{row.stream}</TableCell>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell
                                sx={{
                                    color: row.status === 'visible' ? 'green' : 'red',
                                    fontWeight: 'bold',
                                }}
                            >
                                {row.status}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpenEditDialog(row)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleOpenDeleteDialog(row)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openEditDialog} onClose={handleClose}>
                <DialogTitle>Edit Stream</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Stream"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedStream}
                        onChange={(e) => setEditedStream(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedSubject}
                        onChange={(e) => setEditedSubject(e.target.value)}
                    />
                    <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                        <Select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                            sx={{
                                color: editedStatus === 'visible' ? 'green' : 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            <MenuItem value="visible" sx={{ color: 'green', fontWeight: 'bold' }}>Visible</MenuItem>
                            <MenuItem value="invisible" sx={{ color: 'red', fontWeight: 'bold' }}>Invisible</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddDialog} onClose={handleClose}>
                <DialogTitle>Add New Subject</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Stream"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newStream}
                        onChange={(e) => setNewStream(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                    />
                    <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                        <Select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            sx={{
                                color: newStatus === 'visible' ? 'green' : 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            <MenuItem value="visible" sx={{ color: 'green', fontWeight: 'bold' }}>Visible</MenuItem>
                            <MenuItem value="invisible" sx={{ color: 'red', fontWeight: 'bold' }}>Invisible</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleClose}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default StreamTable;
