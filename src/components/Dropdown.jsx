import { Link } from 'react-router-dom'
import '../utils/style/components.css'

export default function Dropdown(props) {
    let className
    props.isShown ? 
    className = `${props.className} show-dropdown`
        : className = props.className
    
    function logout() {
        sessionStorage.clear()
    }

    return (
        <div className={className}>
            <Link to="/profile" className="dropdown--item">
                Profile
            </Link>
            <Link to="/signin" className="dropdown--item" onClick={logout}>
                Log Out
            </Link>
        </div>
    )
}