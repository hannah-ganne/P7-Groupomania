import Avatar from '@mui/material/Avatar'
import '../utils/style/profile.css'
import Button from '../components/Button'
import { useState } from 'react'
import useFetch from '../utils/hooks/useFetch'
import { departments, oneWord } from '../docs/list'
import Checkbox from '../components/Checkbox'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function EditProfile() {

    const { data, setData, error, loading } = useFetch('GET', 'http://localhost:3000/api/auth/viewProfile')
    
    const [img, setImg] = useState();
    function onImageChange(e) {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    }

    function handleChange(event) {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }
    
    const deptEl = departments.map(dept => {
        return <option key={dept.id} value={dept.label}>{dept.label}</option>
    })

    function handleCheckbox(index) {
        const isUpForArray = data.isUpFor.map((item, currentIndex) =>
        currentIndex === index
            ? { ...item, checked: !item.checked }
            : item
        )

        setData(
            {...data, isUpFor: isUpForArray}
        )
    }
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function deleteAccount() {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        }
        
        const userId = JSON.parse(sessionStorage.getItem('userId'))

        fetch (`http://localhost:3000/api/auth/delete/${userId}`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error(`There's an error sending the data`)
        })
        .then (data => {
            document.location.href = '/signup';
        })
        .catch(err => console.log(err)); 
    }

    function ModalWarning() {

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 560,
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
            <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                Delete Account
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{
                        mt: 2,
                        fontFamily: 'Lato',
                        fontSize: 16
                    }}
                >
                Are you sure you want to delete your account? if you delete your account, you will permanently lose your profile, posts, and comments you wrote.
                </Typography>
                <div className='btns'>
                    <Button className='btn pink' name='Cancel' onClick={handleClose} />    
                    <Button className='btn red' name='Delete' onClick={deleteAccount} />   
                </div>    
            </Box>
            </Modal>
        )
    }

    function handleSubmit(event) {
        event.preventDefault();

        let input = document.getElementById('modify-profile')
        let formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('department', data.department);
        formData.append('expertIn', data.expertIn);
        formData.append('interestedIn', data.interestedIn);
        formData.append('oneWord', data.oneWord);
        formData.append('isUpFor', JSON.stringify(data.isUpFor))
        formData.append('image', input.files[0]);

        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: formData
        }

        fetch ('http://localhost:3000/api/auth/setProfile', fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error(`There's an error sending the data`)
        })
            .then(data => {
            sessionStorage.setItem('imageUrl', JSON.stringify(data.imageUrl) )
            document.location.href = './';
        })
        .catch(err => console.log(err)); 
    }

    if (error) {
        console.log(error)
    }

    return (
        <>
        { loading && <div>Loading...</div> }
        { data && <section className="profile">
            <h2 className="profile-title">Profile</h2>
            <form onSubmit={handleSubmit} >
                <div className="profile-info">
                    <div className="profile-avatar">
                        <Avatar
                            alt="current user's avatar"    
                            sx={{
                                width: 140,
                                height: 140,
                                mr: 5
                                }}
                            src={img ? img : data.imageUrl} />
                        <label htmlFor="modify-profile" className="btn pink avatar-btn">
                            Modify
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="modify-profile"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={onImageChange}
                        />   
                    </div>     
                    <div>
                        <p>
                            <span className="bold">First Name: </span>
                            <input
                                aria-label="input-first-name"    
                                type="text"
                                placeholder={data.firstName}
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                required
                            ></input>
                        </p>
                        <p>
                            <span className="bold">Last Name: </span>
                            <input
                                aria-label="input-last-name"
                                type="text"
                                placeholder={data.lastName}
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                required
                            ></input>
                        </p>
                        <p>
                                <span className="bold">Department: </span>
                                <select name="department" value={data.department} onChange={handleChange} required>
                                    <option value="">Choose your department</option>
                                    {deptEl}
                                </select>
                        </p>
                    </div>
                </div>
                <div className="profile-detail">
                    <span className="bold uppercase">At work I'm expert in...</span>
                        <input
                            aria-label="input-expertise"
                            type="text"
                            placeholder={data.expertIn}
                            name="expertIn"
                            value={data.expertIn}
                            onChange={handleChange}
                            required
                        >
                        </input>
                        
                    <span className="bold uppercase">Personally I"m interested in...</span>
                        <input
                            aria-label="input-interests"
                            type="text"
                            placeholder={data.interestedIn}
                            name="interestedIn"
                            value={data.interestedIn}
                            onChange={handleChange}
                            required
                        >
                        </input>

                    <span className="bold uppercase">Describe yourself in one word</span>
                    <div className="oneWord" value={data.oneWord} onChange={handleChange}>
                            {oneWord.map(word => {
                            return (
                                <div key={word.id}>
                                    <input
                                        type="radio"
                                        key={word.id}
                                        id={word.id}
                                        name="oneWord"
                                        value={word.label}
                                        checked={word.label === data.oneWord}
                                    />
                                    <label
                                        key={word.label}
                                        htmlFor={word.id}
                                    >
                                        {word.label}
                                    </label>
                                </div>
                            )
                            })}
                    </div>
                        
                    <span className="bold uppercase">I am up for...</span>
                    <div className="isUpFor">
                        {data.isUpFor.map((item, index) => {
                            return <Checkbox
                                key={item.label}
                                isChecked={item.checked}
                                checkHandler={() => handleCheckbox(index)}
                                label={item.label}
                                index={index}
                            />
                        })}
                    </div>
                    <Link className="delete-account font-red bold" to="#" onClick={handleOpen}>
                        <p>Delete my account</p>
                    </Link>
                    <ModalWarning />    
                </div>
                <Button className="btn red" name="Confirm changes" type="submit" /> 
            </form>
    </section>
    }
        </>
    )

}