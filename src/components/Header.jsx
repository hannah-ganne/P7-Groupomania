import '../utils/style/Header.css'
import { useState } from 'react'
import more from '../assets/more.png'
import Avatar from './Avatar'
import Dropdown from './Dropdown'

export default function Header(props) {
    const [headerMenuShown, setheaderMenuShown] = useState(false)

    function toggleDropdown() {
        setheaderMenuShown(prevState => !prevState)
    }

    return (
        <header className="main-header">
            <img className="sidebar-toggle" src={more} alt="more icon" onClick={props.toggleSidebar}/>
            <input className="search-bar" placeholder="Search forum..."/>
            <Avatar toggleDropdown={toggleDropdown} />
            <Dropdown className="dropdown dropdown-header bold dark" isShown={headerMenuShown}/>
        </header>
    )
}