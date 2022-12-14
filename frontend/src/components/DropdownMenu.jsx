import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from 'react'

export default function Dropdown(props) {
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
        <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
            {props.button}
        </IconButton>
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
            
            <MenuItem
                sx={{ fontFamily: 'Lato' }}
                component={Link}
                onClick={props.menuOnClick1}
                to={props.menuLink1}    
            >
                <ListItemIcon>
                    {props.menuIcon1}
                </ListItemIcon>
                {props.menuName1}
            </MenuItem>
            <MenuItem
                sx={{ fontFamily: 'Lato' }}
                component={Link}
                onClick={props.menuOnClick2}
                to={props.menuLink2}    
                    
            >
                <ListItemIcon>
                    {props.menuIcon2}
                </ListItemIcon>
                {props.menuName2}
            </MenuItem>
        </Menu>
        </>
    )
}
