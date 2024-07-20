import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, IconButton, Toolbar, Typography, InputBase
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { jsPDF } from "jspdf";
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    left:0,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const NewsFeedT = () => {
    const [newsData, setNewsData] = useState([
        { id: 1, newsId: 'N001', lid: 'L001', image: '', title: 'News Title 1', description: 'News 1', count: 10, status: 'Visible', btnStatus: 'Visible' },
        { id: 2, newsId: 'N002', lid: 'L002', image: '', title: 'News Title 2', description: 'News 2', count: 5, status: 'Invisible', btnStatus: 'Invisible' },
    ]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openStatusConfirm, setOpenStatusConfirm] = useState(false); // New state for status confirmation dialog
    const [currentNews, setCurrentNews] = useState(null);
    const [filter, setFilter] = useState('');
    const [newsToToggle, setNewsToToggle] = useState(null); // New state to store news item for status toggle

    const handleEditOpen = (news) => {
        setCurrentNews(news);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setCurrentNews(null);
    };

    const handleDeleteOpen = (news) => {
        setCurrentNews(news);
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
        setCurrentNews(null);
    };

    const handleAddOpen = () => {
        setCurrentNews({ newsId: '', lid: '', image: '', title: '', description: '', status: 'Visible', count: 0, btnStatus: 'Visible' });
        setOpenAdd(true);
    };

    const handleAddClose = () => {
        setOpenAdd(false);
        setCurrentNews(null);
    };

    const handleEditSave = () => {
        setNewsData(newsData.map(news => (news.id === currentNews.id ? currentNews : news)));
        setOpenEdit(false);
    };

    const handleAddSave = () => {
        setNewsData([...newsData, { ...currentNews, id: newsData.length + 1 }]);
        setOpenAdd(false);
    };

    const handleDeleteConfirm = () => {
        setNewsData(newsData.filter(news => news.id !== currentNews.id));
        setOpenDelete(false);
    };

    const handleStatusConfirmOpen = (news) => {
        setNewsToToggle(news);
        setOpenStatusConfirm(true);
    };

    const handleStatusConfirmClose = () => {
        setOpenStatusConfirm(false);
        setNewsToToggle(null);
    };

    const handleStatusConfirm = () => {
        setNewsData(newsData.map(news =>
            news.id === newsToToggle.id ? { ...newsToToggle, btnStatus: newsToToggle.btnStatus === 'Visible' ? 'Invisible' : 'Visible' } : news
        ));
        setOpenStatusConfirm(false);
        setNewsToToggle(null);
    };

    const handleToggleStatus = (news) => {
        setNewsToToggle(news);
        handleStatusConfirmOpen(news);
    };

    const handleSearch = (event) => {
        setFilter(event.target.value);
    };

    const filteredNews = newsData.filter(news =>
        news.title.toLowerCase().includes(filter.toLowerCase()) ||
        news.description.toLowerCase().includes(filter.toLowerCase())
    );

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("News Report", 20, 10);
        let yOffset = 20;
        filteredNews.forEach(news => {
            doc.text(`NewsID: ${news.newsId}`, 10, yOffset);
            doc.text(`Title: ${news.title}`, 10, yOffset + 10);
            doc.text(`Description: ${news.description}`, 10, yOffset + 20);
            doc.text(`Status: ${news.status}`, 10, yOffset + 30);
            doc.text(`Btn Status: ${news.btnStatus}`, 10, yOffset + 40);
            yOffset += 50;
        });
        doc.save("news_report.pdf");
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentNews({ ...currentNews, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Toolbar>
            <Button color="primary" variant="contained" onClick={handleAddOpen} startIcon={<AddIcon />}>
                    Add News
                </Button>
                <Search className=''>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        style={{border: '1px solid'}}
                        inputProps={{ 'aria-label': 'search' }}
                        value={filter}
                        onChange={handleSearch}
                    />
                </Search>
            
                {/* <Button color="secondary" variant="contained" onClick={generatePDF} style={{ marginLeft: 'auto' }}>
                    Generate PDF
                </Button> */}
            </Toolbar>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>NewsID</TableCell>
                            <TableCell>LID</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Count</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Btn Status</TableCell> {/* New Column */}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredNews.map((news, index) => (
                            <TableRow key={news.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{news.newsId}</TableCell>
                                <TableCell>{news.lid}</TableCell>
                                <TableCell><img src={news.image} alt="news" style={{ width: 50 }} /></TableCell>
                                <TableCell>{news.title}</TableCell>
                                <TableCell>{news.description}</TableCell>
                                <TableCell>{news.count}</TableCell>
                                <TableCell>{news.status}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleToggleStatus(news)}>
                                        {news.btnStatus}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(news)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteOpen(news)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openAdd || openEdit} onClose={openAdd ? handleAddClose : handleEditClose}>
                <DialogTitle>{openAdd ? 'Add News' : 'Edit News'}</DialogTitle>
                <DialogContent>
                {!openAdd && (    <TextField
                        margin="dense"
                        label="News ID"
                        fullWidth
                        value={currentNews?.newsId || ''}
                        onChange={(e) => setCurrentNews({ ...currentNews, newsId: e.target.value })}
                        disabled={!openAdd} // Disable in Edit mode
                    />)}
                    <TextField
                        margin="dense"
                        label="LID"
                        fullWidth
                        value={currentNews?.lid || ''}
                        onChange={(e) => setCurrentNews({ ...currentNews, lid: e.target.value })}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-file-input"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="image-file-input">
                        <Button variant="contained" component="span">
                            Upload Image
                        </Button>
                    </label>
                    {currentNews?.image && (
                        <div style={{ marginTop: 10 }}>
                            <img src={currentNews.image} alt="Preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                        </div>
                    )}
                    <TextField
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={currentNews?.title || ''}
                        onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={currentNews?.description || ''}
                        onChange={(e) => setCurrentNews({ ...currentNews, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Count"
                        type="number"
                        fullWidth
                        value={currentNews?.count || 0}
                        InputProps={{ readOnly: true }} // Count is read-only
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        select
                        fullWidth
                        value={currentNews?.status || 'Visible'}
                        onChange={(e) => setCurrentNews({ ...currentNews, status: e.target.value })}
                        SelectProps={{ native: true }}
                    >
                        <option value="Visible">Visible</option>
                        <option value="Invisible">Invisible</option>
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Btn Status"
                        select
                        fullWidth
                        value={currentNews?.btnStatus || 'Visible'}
                        onChange={(e) => setCurrentNews({ ...currentNews, btnStatus: e.target.value })}
                        SelectProps={{ native: true }}
                    >
                        <option value="Visible">Visible</option>
                        <option value="Invisible">Invisible</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={openAdd ? handleAddClose : handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={openAdd ? handleAddSave : handleEditSave}
                        color="primary"
                    >
                        {openAdd ? 'Add' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this news item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Status Change Confirmation Dialog */}
            <Dialog open={openStatusConfirm} onClose={handleStatusConfirmClose}>
                <DialogTitle>Confirm Status Change</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to change the button status of this news item? This action will update its visibility status on the buttons.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleStatusConfirmClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleStatusConfirm} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewsFeedT;
