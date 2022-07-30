// import Avatar from './Avatar'
import Avatar from '@mui/material/Avatar'
import deleteIcon from '../assets/delete.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function Comment(props) {
    return (
        <div className="comment" id={props.id}>
            <div>
            <Avatar src={props.imageUrl} />
            <span className='bold'>{props.userName}</span>
            <p>{props.comment}</p>
            </div>
            <IconButton className='delete-icon' onClick={(e) => props.deleteComment(e.target.closest('div').id)}>
                <DeleteIcon fontSize='medium' />
            </IconButton>
        </div>
    )
}