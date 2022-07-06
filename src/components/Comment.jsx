import Avatar from './Avatar'
import deleteIcon from '../assets/delete.png'

export default function Comment() {
    return (
        <div className="comment">
            <div>
            <Avatar />
            <span className='bold'>Hannah</span>
            <p>Amazing post, Sarah! I'll try to apply this to my work for sure.</p>
            </div>
            <img className="delete-icon" src={deleteIcon} alt="trashcan icon" />
        </div>
    )
}