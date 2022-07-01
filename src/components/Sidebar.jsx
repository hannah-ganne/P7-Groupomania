import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from './Button'
import '../utils/style/Sidebar.css'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
    let className
    props.isSidebarShown ? 
    className = `${props.className} show-sidebar`
    : className = props.className

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
                    <Link to="#">All posts</Link>
                </li>
            </ul>
            <div className="copyright">© Groupomania All rights reserved.</div>
        </nav>
    )
}