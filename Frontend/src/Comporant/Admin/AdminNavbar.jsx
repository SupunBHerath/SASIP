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
import PaymentIcon from '@mui/icons-material/Payment';
import Badge from '@mui/material/Badge';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
// import UserManage from '../../Pages/UserManage';
// import ADashboard from '../../Pages/ADashboard';
// import PaymentManage from '../../Pages/PaymentManage';
import { Color, Font } from '../CSS/Css';
// import AdsManagePage from '../../Pages/AdsManage';
// import Notification from '../../Pages/Notification';
// import SubjectTable from '../Table/SubjectTable';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios';
import ADashboard from '../../Pages/Admin/ADashboard';
import Lecher from '../../Pages/Admin/Lecture';
import Gallery from '../../Pages/Admin/Gallery';
import TimeTable from '../../Pages/Admin/TimeTable';
import Notification from '../../Pages/Admin/Notification';
import Subject from '../../Pages/Admin/Subject';
import { AuthContext } from '../../Config/AuthContext';

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
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState('dashboard');
  const [row, setRow] = React.useState(null);

  React.useEffect(() => {
    axios.get('/ads/pending')
      .then(response => {
        setRow(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [activeComponent]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboard = () => {
    setActiveComponent('dashboard');
  };

  const lecher = () => {
    setActiveComponent('lecher');
  };

  const timetable = () => {
    setActiveComponent('timetable');
  };

  const gallery = () => {
    setActiveComponent('gallery');
  };

  const notification = () => {
    setActiveComponent('notification');
  };

  const subject = () => {
    setActiveComponent('subject');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: Color.PrimaryColor }}>
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
          <Typography variant="h6" noWrap component="div">
            {/* You can add a title here */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography className='mx-5 w-100'
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
            style={{ fontFamily: Font.PrimaryFont }}>
            TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>
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
          <ListItemButton onClick={gallery}>
            <ListItemIcon>
              <Badge badgeContent={row} color="success">
                <PaymentIcon sx={activeComponent === 'gallery' ? { color: Color.SecondaryColor } : {}} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Gallery</span>} sx={activeComponent === 'gallery' ? { color: Color.SecondaryColor } : {}} />
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
          <ListItemButton onClick={subject}>
            <ListItemIcon>
              <AddAlertIcon sx={activeComponent === 'subject' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Subject List</span>} sx={activeComponent === 'subject' ? { color: Color.SecondaryColor } : {}} />
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
        {activeComponent === 'subject' && <Subject />}
        {activeComponent === 'notification' && <Notification />}
      </Box>
    </Box>
  );
}
