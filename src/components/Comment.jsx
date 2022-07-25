// import Avatar from './Avatar'
import Avatar from '@mui/material/Avatar'
import deleteIcon from '../assets/delete.png'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Comment(props) {
    return (
        <div className="comment">
            <div>
            <Avatar src={props.imageUrl} />
            <span className='bold'>{props.userName}</span>
            <p>{props.comment}</p>
            </div>
            <DeleteIcon className='delete-icon' fontSize='medium'/>
        </div>
    )
}