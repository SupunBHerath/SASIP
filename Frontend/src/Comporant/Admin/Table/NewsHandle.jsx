import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, IconButton, Typography, Tooltip, List, ListItem, ListItemText, Divider, Card, CardContent, CardActions, Collapse, Pagination, Snackbar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MuiAlert from '@mui/material/Alert';

const NewsHandle = () => {
    const [newsData, setNewsData] = useState([
        { id: 1, newsId: 'N001', title: 'News Title 1', subscribers: ['user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com', 'user6@example.com', 'user7@example.com', 'user8@example.com', 'user9@example.com', 'user10@example.com', 'user11@example.com'] },
        { id: 2, newsId: 'N002', title: 'News Title 2', subscribers: ['user12@example.com', 'user13@example.com', 'user14@example.com'] },
    ]);

    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [emailForm, setEmailForm] = useState({ subject: '', description: '', image: null, link: '' });
    const [expandedNews, setExpandedNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleEmailDialogOpen = (news) => {
        setSelectedNews(news);
        setOpenEmailDialog(true);
    };

    const handleEmailDialogClose = () => {
        setOpenEmailDialog(false);
        setSelectedNews(null);
        setEmailForm({ subject: '', description: '', image: null, link: '' });
        setCurrentPage(1); // Reset to the first page when dialog closes
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmailForm({ ...emailForm, [name]: value });
    };

    const handleImageUpload = (e) => {
        setEmailForm({ ...emailForm, image: e.target.files[0] });
    };

    const sendEmail = (to) => {
        // Implement email sending logic here
        console.log(`Sending email to: ${to}`, emailForm);
        setOpenSnackbar(true);
        handleEmailDialogClose();
    };

    const handleExpandClick = (newsId) => {
        setExpandedNews(expandedNews === newsId ? null : newsId);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getPaginatedSubscribers = (subscribers) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return subscribers.slice(startIndex, endIndex);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {newsData.map((news) => (
                    <Card key={news.id} variant="outlined" style={{ marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                                {news.newsId}: {news.title}
                                <Typography variant="body2" color="textSecondary" style={{ marginLeft: '8px' }}>
                                    ({news.subscribers.length} emails)
                                </Typography>
                                <Tooltip title="Send All Emails">
                                    <IconButton
                                        onClick={() => handleEmailDialogOpen(news)}
                                        style={{ marginLeft: 'auto' }}
                                    >
                                        <EmailIcon />
                                    </IconButton>
                                </Tooltip>
                                <IconButton
                                    onClick={() => handleExpandClick(news.id)}
                                    style={{ marginLeft: '8px' }}
                                >
                                    {expandedNews === news.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Collapse in={expandedNews === news.id}>
                            <List>
                                {getPaginatedSubscribers(news.subscribers).map((email, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={email} />
                                    </ListItem>
                                ))}
                            </List>
                            {news.subscribers.length > itemsPerPage && (
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Pagination
                                        count={Math.ceil(news.subscribers.length / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </CardActions>
                            )}
                        </Collapse>
                    </Card>
                ))}
            </div>

            {/* Email Dialog */}
            <Dialog open={openEmailDialog} onClose={handleEmailDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Send Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the details below to send an email to the subscribers of this news item.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="subject"
                        label="Subject"
                        fullWidth
                        value={emailForm.subject}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={emailForm.description}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<AttachFileIcon />}
                            style={{ marginBottom: '16px' }}
                        >
                            Upload Image
                        </Button>
                    </label>
                    {emailForm.image && (
                        <div style={{ marginTop: '16px' }}>
                            <Typography variant="body2">Selected Image: {emailForm.image.name}</Typography>
                        </div>
                    )}
                    <TextField
                        margin="dense"
                        name="link"
                        label="Link"
                        fullWidth
                        value={emailForm.link}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmailDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => sendEmail(selectedNews?.subscribers)} color="primary">
                        Send Email to All
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Alert */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                action={
                    <Button color="inherit" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
            >
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Emails sent successfully!
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default NewsHandle;
