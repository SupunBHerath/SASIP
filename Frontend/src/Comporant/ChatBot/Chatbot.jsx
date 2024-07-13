import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, IconButton, List, ListItem, ListItemText, Paper, Box, CircularProgress, AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';
import logo from '../../../public/Icon/robo.png';
import user from '../../../public/Icon/user.png';
import { Color, Font } from '../CSS/Css';
import { CloseRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Chatbot = ({ handleClose }) => {
    const nav = useNavigate();
    const [teacher, setTeacher] = useState(0);
    const [student, setStudent] = useState(0);
    const [teacherData, setTeacherData] = useState([]);
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'model',
            content: `Hello! How can I assist you today? `,
            avatar: logo,
            type: 'text'
        },
    ]);



    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const userAvatarUrl = `${user}`;
    const botAvatarUrl = `${logo}`;

    const keywords = [
        { keyword: 'How to Contact ', defaultMessage: 'You can email us at <span style="color: #f6921e;">supunbherath@gmail.com</span> <br> or call us at <br> <span style="color: #f6921e;">078 250 33 87</span>.' },
        { keyword: 'How To Search Teacher', defaultMessage: 'To search for a teacher, <br> go to the search page, enter the teacher\'s name, location, or class type. You can then view their profile and contact details.' },

    ];

    const defaultName = "Amith Pussalla ";

    const defaultHistory = [
        {
            id: 100,
            role: 'user',
            content: `As the project owner and builder, my name is Supun B Herath, and I'm a passionate full-stack developer. 
                      I thrive on building innovative and engaging web applications. You can find my work on GitHub under the username "supunbherath." 
                      I'm always eager to connect with fellow developers and contribute to open-source projects. 
                      If you'd like to reach out, my email is supunbherath@gmail.com, and you can also reach me at 0782503387. 
                      Regarding this chatbot builder, it's a project I've been working on to help people create and deploy their own chatbots. 
                      I'm excited to see how people use it to build powerful and helpful AI experiences.`,
            avatar: botAvatarUrl,
            type: 'text',
        },
        {
            id: 102,
            role: 'user',
            content: `About Sasip Institute
        
            Sasip Institute, established in 1997, is a leading educational institution dedicated to providing comprehensive educational services. We specialize in nurturing future generations with outstanding academic achievements and exemplary character development. Our commitment extends to delivering excellence in education through advanced teaching methodologies and a supportive learning environment.
            
            At Sasip, we strive for continuous improvement and excellence in every aspect of education. Our goal is to empower students with the knowledge and skills necessary to succeed in a competitive world. We are proud to foster a community where learning is enriched, and achievements are celebrated.
            
            For more information:
            
            Contact Details:
            
            Phone Numbers: 0723 825 193, 0112 825 193
            Website: www.sasip.lk
            Educational Programs Website: www.sasipinstitute.com
            Email: sasip.physics@gmail.com
            Address:
            282/7, Hayelawala Road,
            Nugagoda,
            Sri Lanka.
            
            Postal Code: 10250
            
            Locations:
            
            City: Colombo
            Town: Nugagoda`,
            avatar: botAvatarUrl,
            type: 'text',
        }
        
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (messageContent) => {
        const content = messageContent || input;
        if (content.trim() === '') return;

        const newMessage = { id: messages.length + 1, role: 'user', content, avatar: userAvatarUrl, type: 'text' };
        setMessages([...messages, newMessage]);
        setLoading(true);

        const keyword = keywords.find(k => k.keyword.toLowerCase() === content.toLowerCase());
        if (keyword) {
            const botMessage = { id: messages.length + 2, role: 'model', content: keyword.defaultMessage, avatar: botAvatarUrl, type: 'text' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            setInput('');
            setLoading(false);
            return;
        }

        try {
            const latestHistory = messages.slice(-5);
            const combinedHistory = [...defaultHistory, ...latestHistory];
            const history = combinedHistory.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));


            const response = await axios.post('https://tutornet-5v7a-supunbheraths-projects.vercel.app/chat', { prompt: content, history });

            const formattedContent = response.data.text.replace(/\n/g, '<br>');
            const botMessage = { id: messages.length + 2, role: 'model', content: formattedContent, avatar: botAvatarUrl, type: 'text' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching response from the API:', error);
        }

        setInput('');
        setLoading(false);
    };

    const copyMessage = (content) => {
        const strippedContent = content.replace(/<[^>]*>/g, '');
        navigator.clipboard.writeText(strippedContent);
    };

    const renderMessageContent = (message, index) => {
        switch (message.type) {
            case 'text':
                return (
                    <ListItemText primary={<div style={{ fontFamily: 'sans-serif' }} dangerouslySetInnerHTML={{ __html: message.content }} />} style={{ color: '#fff' }} />
                );
            case 'code':
                return (
                    <ListItemText primary={message.content} style={{ color: Color.SecondaryColor, fontFamily: Font.PrimaryFont }} />
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="sm" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '80vh', backgroundColor: '#1E1E1E' }} className='shadow-lg'>
            <AppBar position="static" style={{ backgroundColor: Color.PrimaryColor }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, color: Color.SecondaryColor, fontFamily: Font.PrimaryFont }} className='text-center' >
                        SASIP AI BOT
                    </Typography>
                    <div className=" text-danger  ">
                        <IconButton onClick={handleClose} style={{ color: 'red' }} >
                            <CloseRounded />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Paper
                elevation={0}
                style={{
                    flex: 1,
                    padding: '1em',
                    marginTop: '1em',
                    marginBottom: '1em',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    backgroundColor: '#252526',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List style={{ flexGrow: 1 }}>
                    {messages.map((msg, index) => (
                        <ListItem
                            key={msg.id}
                            style={{
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '40px',
                                alignItems: 'flex-start',
                            }}
                        >
                            {msg.role === 'model' && (
                                <Avatar src={msg.avatar} style={{ marginRight: '10px' }} />
                            )}
                            <Paper
                                style={{
                                    position: 'relative',
                                    padding: '10px',
                                    backgroundColor: msg.role === 'user' ? '#0B8140' : '#444444',
                                    borderRadius: '20px',
                                    maxWidth: '80%',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {renderMessageContent(msg, index)}
                                {msg.role === 'model' && (
                                    <IconButton
                                        aria-label="copy"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '-40px',
                                            color: 'white',
                                        }}
                                        onClick={() => copyMessage(msg.content)}
                                    >
                                        <FileCopyIcon />
                                    </IconButton>
                                )}
                            </Paper>
                            {msg.role === 'user' && (
                                <Avatar src={msg.avatar} style={{ marginLeft: '10px' }} />
                            )}
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Paper>
            <Box
                alignItems="center"
                flexDirection="column"
                style={{
                    padding: '10px',
                    borderTop: '1px solid #333',
                    backgroundColor: '#252526',
                }}
            >
                <Box
                    display="flex"
                    flexWrap="nowrap"
                    style={{
                        marginBottom: '10px',
                        overflowX: 'auto',
                    }}
                >
                    {keywords.map((keywordObj, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            style={{
                                margin: '5px',
                                backgroundColor: Color.PrimaryColor,
                                color: Color.SecondaryColor,
                                fontFamily: Font.PrimaryFont,
                                minWidth: '297px',
                            }}
                            onClick={() => handleSend(keywordObj.keyword)}
                        >
                            {keywordObj.keyword}
                        </Button>
                    ))}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    style={{
                        width: '100%',
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                        style={{ marginRight: '8px', backgroundColor: '#333', borderRadius: '4px' }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <IconButton
                        color="primary"
                        onClick={() => handleSend()}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} style={{ color: '#007ACC' }} /> : <SendIcon style={{ color: '#007ACC' }} />}
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
};

export default Chatbot;
