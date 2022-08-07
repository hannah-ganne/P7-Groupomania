import '../utils/style/Header.css'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import useFetch from '../utils/hooks/useFetch'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header(props) {

    const { data, loading, error } = useFetch('GET', 'http://localhost:3000/api/auth/viewProfile')
    const [inputValue, setInputValue] = useState('')

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    };
    function handleClose() {
        setAnchorEl(null);
    };

    function handleKeyPress(event) {
        if (event.charCode === 13) {
            props.setKeyword(inputValue)
        }
    }

    if (error) {
        console.log(error)
    }
    
    return (
    <>
        { loading && <div>Loading...</div>}
        {data &&
        <header className="main-header">
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
            >
            <MenuIcon className="sidebar-toggle" />
            </IconButton>
                    
            <div className="search-bar">   
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
                    fullWidth
                    value={inputValue}
                            onChange={event => setInputValue(event.target.value)}
                            onKeyPress={handleKeyPress}
                />
            </div>
                    
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 50, height: 50 }} src={data.imageUrl} />
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

                    {JSON.parse(sessionStorage.getItem("isAdmin")) && (
                        <MenuItem
                            sx={{ fontFamily: 'Lato' }}
                            component={Link}
                            to='/admin'>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small"/>     
                        </ListItemIcon>
                        Admin
                        </MenuItem> 
                    )}
                    <MenuItem
                        sx={{ fontFamily: 'Lato' }}
                        component={Link}
                        to='/profile'>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small"/>     
                    </ListItemIcon>    
                    Profile
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
            }
        </>
    )
}