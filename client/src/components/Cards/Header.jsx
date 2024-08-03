import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { format } from 'date-fns';
import SidebarMenu from './SidebarMenu'; // Import the SidebarMenu component
import '../../styles/Fonts.css';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const currentDate = format(new Date(), 'EEEE, do MMMM, yyyy');

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          height: 170,
          background: '#263238',
          marginTop: 1,
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative'
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <IconButton
            edge="start"
            size="extra large"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ position: 'absolute', top: 12, left: 25 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: 'center',
              color: '#FAFAFA',
              fontFamily: '"Martian Mono", monospace',
              fontSize: 65,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              textTransform: 'uppercase',
              marginTop: 2,
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            JEE Planner
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              top: 120,
              right: 20,
              color: 'white',
              fontSize: 25,
              fontFamily: 'Radio Canada Big'
            }}
          >
            {currentDate}
          </Typography>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        ></Box>
      </AppBar>
      <SidebarMenu open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </Box>
  );
}
