import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from './Button'
import '../utils/style/Sidebar.css'
import { Link } from 'react-router-dom'
import { departments } from '../docs/list'
import { useFetch } from '../utils/hooks/useFetch'

export default function Sidebar(props) {
    let className
    props.isSidebarShown ? 
    className = `${props.className} show-sidebar`
        : className = props.className
    
    const menuEl = departments.map(item => {
        return <div key={item.id} className="filter-dept" onClick={()=>props.handleFilter(item.label)}>
                <i className={`${item.icon} fa-fw`}></i>
                {item.label}
                </div>
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
                        <i className="fa-solid fa-comments"></i>
                        All posts
                    </Link>
                    {menuEl}
                </li>
            </ul>
            <div className="copyright">© Groupomania All rights reserved.</div>
        </nav>
    )
}