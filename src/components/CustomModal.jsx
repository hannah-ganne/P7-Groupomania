import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import { useState, useEffect } from 'react'

export default function CustomModal(props) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(props.modalOpen)
    }, [props.modalOpen])

    const handleClose = () => {
        props.onModalChange(false)
    }

    function checkVowel() {
        const vowels = ['A', 'E', 'I', 'O', 'U']
        return vowels.includes(props.oneWord.slice(0, 1)) ? 'an' : 'a'
    } 

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
            border: 'none',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='profile' sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 'bold',
                        fontSize: 30
                    }}
                >
                    Profile
                </Typography>
                <div className='profile-info'>
                    <Avatar
                            src={props.imageUrl} 
                            sx={{ width: 120, height: 120, mr: 3 }}
                        />
                    <div>
                        <p><span className="bold">Name: </span>{`${props.firstName} ${props.lastName}`}</p>
                        <p><span className="bold">Department: </span>{props.department}</p>
                    </div>               
                </div>                
                <div className="profile-detail">
                    <span className="bold uppercase">At work I'm expert in...</span>
                    <p>{props.expertIn}</p>
                    <span className="bold uppercase">Personally I'm interested in...</span>
                    <p>{props.interestedIn}</p>
                    <span className="bold uppercase">Describe yourself in one word</span>
                    <p>I am {checkVowel()} <span className='bold uppercase'>{props.oneWord}</span> person</p>
                    <span className="bold uppercase">I am up for...</span>
                        <p>
                            {props.isUpFor.map((item, index) => {
                                if (index === props.isUpFor.length - 1) {
                                    return item.label
                                } else { return item.label + ', ' }
                            })}
                        </p>    
                </div> 
            </Box>
        </Modal>
    )  
}