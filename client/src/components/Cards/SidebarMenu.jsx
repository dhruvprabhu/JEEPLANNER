import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, IconButton, Button, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UpdateUserModal from './UpdateUserModal';
import DeleteUserModal from './DeleteUserModal';
import LogoutModal from './LogoutModal'; // Import the new LogoutModal component

const SidebarMenu = ({ open, onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout modal
  
  const user = { username: 'currentUsername', email: 'currentEmail@example.com' };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true); // Open the logout modal
  };

  const handleDeleteUser = () => {
    setIsDeleteUserModalOpen(true);
    handleMenuClose();
  };

  const handleUpdateUser = () => {
    setIsUpdateUserModalOpen(true);
    handleMenuClose();
  };

  const handleCloseUpdateUserModal = () => {
    setIsUpdateUserModalOpen(false);
  };

  const handleCloseDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality
    console.log('Account deleted');
    handleCloseDeleteUserModal();
  };

  const handleArchivePapersClick = () => {
    window.open('https://drive.google.com/drive/folders/1Dp2DLZtWTSinPC_jix8CTMI9kTs2JJtl?usp=drive_link', '_blank');
  };

  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#263238', height: 300, borderRadius: 2 } }}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: '#FAFAFA',
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingTop: 2 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={onClose}
              sx={{ position: 'absolute', top: 8, right: 8, color: '#FAFAFA' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Radio Canada Big', color: 'white', fontSize: 25, left: 2 }}>
              Dashboard
            </Typography>
            <Divider sx={{ width: '100%', marginBottom: 2, borderColor: '#FAFAFA' }} />
            <List sx={{ width: '100%' }}>
              <ListItem button onClick={handleProfileClick}>
                <AccountCircleIcon sx={{ color: '#FAFAFA', marginRight: 2, height: 40, width: 40 }} />
                <ListItemText 
                  primary="Profile" 
                  sx={{ 
                    color: '#FAFAFA', 
                    fontFamily: 'Radio Canada Big', 
                    fontSize: 20,
                    '& .MuiTypography-root': { // Apply styles to the Typography component inside ListItemText
                      fontFamily: 'Radio Canada Big', 
                      fontSize: 20 
                    }
                  }} 
                />
              </ListItem>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{ sx: { backgroundColor: '#263238', color: '#FAFAFA' } }}
              >
                <MenuItem onClick={handleUpdateUser}>Update User</MenuItem>
                <MenuItem onClick={handleDeleteUser}>Delete User</MenuItem>
              </Menu>
              <ListItem button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleArchivePapersClick}
                >
                  Archive Papers
                </Button>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ padding: 2, borderTop: '1px solid #FAFAFA', marginTop: 'auto' }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
      <UpdateUserModal open={isUpdateUserModalOpen} onClose={handleCloseUpdateUserModal} user={user} />
      <DeleteUserModal open={isDeleteUserModalOpen} onClose={handleCloseDeleteUserModal} onDelete={handleDeleteAccount} />
      <LogoutModal open={isLogoutModalOpen} onClose={handleCloseLogoutModal} />
    </>
  );
};

export default SidebarMenu;
