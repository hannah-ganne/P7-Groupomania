import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from './Button'
import '../utils/style/Sidebar.css'
import { Link } from 'react-router-dom'
import { departments } from '../docs/list'
import { useFetch } from '../utils/hooks/useFetch'
import ForumIcon from '@mui/icons-material/Forum';

export default function Sidebar(props) {
    let className
    props.isSidebarShown ? 
    className = `${props.className} show-sidebar`
        : className = props.className
    
    const menuEl = departments.map(item => {
        return <Link key={item.id} className="filter-dept" onClick={() => props.handleFilter(item.label)} to='/'>
                    <div key={item.id} >
                    {item.icon}
                    {item.label}
                    </div>
                </Link>
    })

    return (
        <nav className={className}>
            <Link to="/">
                <img className="logo" src={logo} alt="logo of groupomania" />
            </Link>
            <Link to="/write">
                <Button className="sidebar--btn btn red" name="start posting" />
            </Link>
            <ul className="sidebar--menu">
                <li>
                    <Link to="/">
                        <ForumIcon />
                        All posts
                    </Link>
                    {menuEl}
                </li>
            </ul>
            <div className="copyright">© Groupomania All rights reserved.</div>
        </nav>
    )
}