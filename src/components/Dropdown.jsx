import { Link } from 'react-router-dom'
import '../utils/style/components.css'

export default function Dropdown(props) {
    let className
    props.isShown ? 
    className = `${props.className} show-dropdown`
    : className = props.className

    return (
        <div className={className}>
            <Link to="/profile" className="dropdown--item">
                Profile
            </Link>
            <Link to="#" className="dropdown--item">
                Log Out
            </Link>
        </div>
    )
}