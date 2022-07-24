import '../utils/style/Header.css'
import { useState } from 'react'
import more from '../assets/more.png'
// import Avatar from './Avatar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom'

export default function Header(props) {
    // const [headerMenuShown, setheaderMenuShown] = useState(false)

    // function toggleDropdown() {
    //     setheaderMenuShown(prevState => !prevState)
    // }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <header className="main-header">
            <img className="sidebar-toggle" src={more} alt="more icon" onClick={props.toggleSidebar}/>
            {/* <input className="search-bar" placeholder="Search forum..." /> */}
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                placeholder='Search forum...'
                sx={{
                    fontFamily: 'Lato',
                }}
            />
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
            <Avatar sx={{ width: 50, height: 50 }}/>
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
                    sx={{fontFamily: 'Lato'}}
                    component={Link}
                    to='/profile'>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem
                    sx={{ fontFamily: 'Lato' }}
                    component={Link}
                    onClick={() => sessionStorage.clear()}
                    to='/signin'
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

        </header>
    )
}