
import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from './Button'
import '../utils/style/Sidebar.css'
import { Link } from 'react-router-dom'
import { departments } from '../docs/list'
import ForumIcon from '@mui/icons-material/Forum';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

const drawerWidth = 300;


export default function Sidebar(props) {    

    const menuEl = departments.map(item => {
        return <Link key={item.id} className="filter-dept" onClick={() => props.setDepartment(item.label)} to='/'>
                    <div key={item.id} >
                    {item.icon}
                    {item.label}
                    </div>
                </Link>
    })

    const drawer = (
        <>
        <Link onClick={() => props.setLoadAll(prev => !prev)} to="/">
            <img className="logo" src={logo} alt="logo of groupomania" />
        </Link>
        <Link className='btn-container' to="/write">
            <Button className="sidebar--btn btn red" name="start posting" />
        </Link>
        <ul className="sidebar--menu">
            <li>
                    <Link onClick={() => props.setLoadAll(prev => !prev)} to="/">
                    <ForumIcon />
                    All posts
                </Link>
                {menuEl}
            </li>
        </ul>
        <div className="copyright">© Groupomania All rights reserved.</div>   
        </>
    )

    return (
    <>
        <Box
            component="nav"  
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
                backgroundColor: '#FFD7D7',
                boxShadow: 0,
                borderRight: 0
            }}
            aria-label="mailbox folders"    
        >
            <Drawer
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    boxShadow: 3,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'block'},
                    boxShadow: 3,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    </>
    )
}