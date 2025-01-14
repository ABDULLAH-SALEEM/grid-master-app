import { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Button } from '@mui/material';
import { ICONS } from 'src/assets/library';

const MenuPopover = ({ menuArray, isButton, buttonText }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account settings">
        {isButton ? (
          <Button variant="contained" size="small" onClick={handleClick}>
            {buttonText}
          </Button>
        ) : (
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, height: 28, width: 28 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {ICONS.MORE}
          </IconButton>
        )}
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuArray?.map(({ action, name, icon }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action();
              handleClose();
            }}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ListItemIcon>
              <div style={{ width: 22, height: 22 }}>{icon}</div>
            </ListItemIcon>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuPopover;
