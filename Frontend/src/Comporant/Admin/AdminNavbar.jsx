import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Dashboard from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Badge from '@mui/material/Badge';
import CollectionsIcon from '@mui/icons-material/Collections';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { Color, Font } from '../CSS/Css';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios';
import ADashboard from '../../Pages/Admin/ADashboard';
import Lecher from '../../Pages/Admin/Lecture';
import Gallery from '../../Pages/Admin/Gallery';
import Notification from '../../Pages/Admin/Notification';
import BookIcon from '@mui/icons-material/Book';
import { AuthContext } from '../../Config/AuthContext';
import NewsTabs from './NewsTab';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState('dashboard');
  const [row, setRow] = React.useState(null);
  const [title, setTite] = React.useState('Welcome to Admin Dashboard');
  const navigate = useNavigate();
  const { logout } = React.useContext(AuthContext);

 const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  React.useEffect(() => {
    axios.get('/ads/pending')
      .then(response => {
        setRow(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [activeComponent]);

 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboard = () => {
    setActiveComponent('dashboard');
    setTite('Welcome to Admin Dashboard');
  };

  const lecher = () => {
    setActiveComponent('lecher');
    setTite('Lecturers Table ');
  };

  const timetable = () => {
    setActiveComponent('timetable');

  };

  const gallery = () => {
    setActiveComponent('gallery');
    setTite('Gallery');
  };

  const notification = () => {
    setActiveComponent('notification');
    setTite('Notification Table ');
  };

  const subject = () => {
    setActiveComponent('subject');
    setTite('News Feed ');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className='text-bg-secondary'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='w-100'>
            <div className="text-center w-100" style={{ fontFamily: Font.PrimaryFont }}>
              <h2 >{title} </h2>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <Typography className='mx-5 w-100'
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
            style={{ fontFamily: Font.PrimaryFont }}>
            SASIP
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 230, bgcolor: 'background.paper', fontFamily: Font.PrimaryFont }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
        >
          <br />
          <ListItemButton className='active' onClick={dashboard}>
            <ListItemIcon>
              <Dashboard sx={activeComponent === 'dashboard' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Dashboard</span>} sx={activeComponent === 'dashboard' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={lecher}>
            <ListItemIcon>
              <ManageAccountsIcon sx={activeComponent === 'lecher' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Lechers</span>} sx={activeComponent === 'lecher' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={subject}>
            <ListItemIcon>
              <BookIcon sx={activeComponent === 'subject' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Subject List</span>} sx={activeComponent === 'subject' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={notification}>
            <ListItemIcon>
              <Badge badgeContent={row} color="success">
                <FeedbackIcon sx={activeComponent === 'notification' ? { color: Color.SecondaryColor } : {}} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Notification</span>} sx={activeComponent === 'notification' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={gallery}>
            <ListItemIcon>
              <Badge >
                <CollectionsIcon sx={activeComponent === 'gallery' ? { color: Color.SecondaryColor } : {}} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Gallery</span>} sx={activeComponent === 'gallery' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br /><br />
       
       
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Logout</span>} />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeComponent === 'dashboard' && <ADashboard />}
        {activeComponent === 'lecher' && <Lecher />}
        {activeComponent === 'gallery' && <Gallery />}
        {activeComponent === 'timetable' && <TimeTable />}
        {activeComponent === 'subject' && <NewsTabs />}
        {activeComponent === 'notification' && <Notification />}
      </Box>
    </Box>
  );
}