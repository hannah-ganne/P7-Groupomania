import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';

export default function Like(props) {

    return (
    <div className="like">
        <div>
            <IconButton id="1" onClick={props.handleLike} aria-label="like-button">
                <ThumbUpIcon fontSize="small" color={props.alreadyLiked === 1 ? 'success' : 'neutral'} />    
            </IconButton>
            <span className="bold">{props.likesCount}</span>
        </div>    
        <div>
            <IconButton id="-1" onClick={props.handleLike} aria-label="dislike-button">
                <ThumbDownIcon fontSize="small" color={props.alreadyLiked === -1 ? 'error' : 'neutral'}/>
            </IconButton>        
            <span className="bold">{props.dislikesCount}</span>
        </div>       
    </div>
    )
}